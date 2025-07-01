import { Router } from 'express';
import sql from 'mssql'
import { middleware } from '../middleware.js';
const router = Router()

// router.use(middleware)

// GET api to serve images
router.get('/data', async (req, res) => {
    console.log(`Get Request for data route`);
    const recordset = await runQuery();

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
}

async function runQuery() {
    try {
        const pool = await sql.connect(config)
        const result = await pool.request()
            .query('SELECT * FROM [ImageFeaturesDB].[dbo].[Cores]')

        console.log('.................');
        console.log('result: ', result)
        return result.recordset
    } catch (err) {
        console.error('MSSQL Error:', err)
    } finally {
        await sql.close()
    }
}

export default router;