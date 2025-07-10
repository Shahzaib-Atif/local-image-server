import { Router } from "express";
import sql from "mssql";
import { middleware } from "../middleware.js";
const router = Router();

router.use(middleware);

// GET api to serve images
router.get("/data/:entidade", async (req, res) => {
    console.log(`Get Request for data route`);
    const entidade = req.params.entidade;
    console.log(entidade);

    const recordset = await runQuery(entidade);

    res.status(200).json(recordset);
});

const config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.ImageFeaturesDB,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};

async function runQuery(entidade) {
    try {
        const pool = await sql.connect(config);
        const result = await pool
            .request()
            .query(
                `SELECT top(1) CaminhoPastaSP  FROM [ImageFeaturesDB].[dbo].[ClientesFolderSharePoint] where Entidade='${entidade}'`
            );

        const { rowsAffected, recordset } = result;
        if (rowsAffected[0] > 0) {
            return recordset[0]?.CaminhoPastaSP; // Return first (and only) record
        } else {
            return null;
        }
    } catch (err) {
        console.error("MSSQL Error:", err);
    } finally {
        await sql.close();
    }
}

export default router;
