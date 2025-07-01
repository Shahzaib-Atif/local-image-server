import 'dotenv/config'
import express from 'express';
const app = express();
import imagesRouter from './routes/images.js';
import localdbRouter from './routes/localdb.js';

app.use('/images', imagesRouter);
app.use('/localdb', localdbRouter)
app.use('/', (req, res) => {
    res.send(`Server is running at http://localhost:${PORT}`);
})

// start the server
const PORT = process.env.PORT || 3011;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);

    // tunnel command --> npx cloudflared tunnel --url http://localhost:3010
});

