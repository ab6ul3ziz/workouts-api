const express = require("express");
const router = require("./routes/workouts");
const userRoutes = require("./routes/user");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
dotenv.config();
const crosOption = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const port = process.env.PORT || 3000;
app.use(cors(crosOption));
app.use(express.json({ limit: "50mb" }));
app.use((req, res, next) => {
  // console.log(req.path, req.method);
  next();
});

app.use("/api/workout", router);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log("app start");
    });
  })
  .catch((err) => console.log(err));
