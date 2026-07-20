import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Sabse pehle .env load karo
dotenv.config({ path: path.resolve(__dirname, "./config.env") });

import app from "./src/app.js";
import ConnectDB from "./src/config/db.js";
import "./src/config/passport.js";

ConnectDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
