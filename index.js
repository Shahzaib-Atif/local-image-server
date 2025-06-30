import 'dotenv/config'
import express from 'express';
const app = express();
import imagesRouter from './routes/images.js';

app.use('/images', imagesRouter);

// start the server
const PORT = process.env.PORT || 3011;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);

    // tunnel command --> npx cloudflared tunnel --url http://localhost:3010
});

