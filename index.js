import express from "express";
import { config } from "./config.js";
const app = express();
import imagesRouter from "./routes/images.js";
import localdbRouter from "./routes/localdb.js";

app.use("/images", imagesRouter);
app.use("/localdb", localdbRouter);
app.use("/", (req, res) => {
  res.send(`Server is running at http://localhost:${config.PORT}`);
});

// start the server
app.listen(config.PORT, () => {
  console.log(`Server running at http://localhost:${config.PORT}`);

  // tunnel command --> npx cloudflared tunnel --url http://localhost:3010
});
