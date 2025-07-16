import { Router } from "express";
import sql from "mssql";
import { middleware } from "../middleware.js";
import { config } from "../config.js";
const router = Router();

router.use(middleware);

// Handle /data without prodId
router.get("/data", async (req, res) => {
  console.log(`Get Request for data route without prodId`);

  res.status(400).json({
    error: "Product ID is required",
    message: "Please provide a product ID in the URL: /data/{prodId}",
  });
});

// GET api to serve images
router.get("/data/:prodId", async (req, res) => {
  console.log(`Get Request for data route`);
  const prodId = req.params.prodId;

  const recordset = await getTechnicalFolderPath(prodId);

  res.status(200).json(recordset);
});

// GET api to serve images
router.get("/data/:prodId", async (req, res) => {
  console.log(`Get Request for data route`);
  const prodId = req.params.prodId;

  const recordset = await getTechnicalFolderPath(prodId);

  res.status(200).json(recordset);
});

const dbConfig = {
  user: config.USER,
  password: config.PASSWORD,
  server: config.SERVER,
  database: config.ImageFeaturesDB,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

async function getTechnicalFolderPath(prodId) {
  try {
    console.log("prodId: ", prodId);

    const pool = await sql.connect(dbConfig);

    // Query 1: Get ORDEM ID
    const ordemResult = await pool
      .request()
      .input("prodId", sql.NVarChar, prodId).query(`
                SELECT TOP (1) [ORDEM ID]
                FROM [ImageFeaturesDB].[dbo].[V_ProdIDClientCODIMACID]
                WHERE [PROD ID] = @prodId
                `);

    if (!ordemResult.recordset[0]) {
      return null; // No ORDEM ID found
    }
    const ordemId = ordemResult.recordset[0]["ORDEM ID"]?.toString()?.trim();
    console.log("ordemId: ", ordemId);

    // query 2
    const pathResult = await pool
      .request()
      .input("ordemId", sql.NVarChar, ordemId).query(`
        SELECT TOP (1) [Path]
        FROM [ImageFeaturesDB].[dbo].[SharePoint_FoldersURL]
        WHERE [Path] LIKE '%' + @ordemId + '%'
            AND ([Path] LIKE '%fiches techniques%' 
            OR [Path] LIKE '%fichas técnicas%' 
            OR [Path] LIKE '%technical%')
        `);

    const technicalFolderPath = pathResult.recordset[0]?.Path;
    console.log("technicalFolderPath: ", technicalFolderPath);
    return technicalFolderPath;
  } catch (err) {
    console.error("MSSQL Error:", err);
  } finally {
    await sql.close();
  }
}

export default router;
