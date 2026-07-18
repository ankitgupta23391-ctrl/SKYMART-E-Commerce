import dotenv from "dotenv";
import app from "./src/app.js";
import ConnectDB from "./src/config/db.js";
dotenv.config({path:"./config.env"})
import passport from "passport";
import "./src/config/passport.js"; 


ConnectDB();
const port = process.env.PORT

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})