const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const slotRoute = require("./routes/booking");
const createStudioRoute = require("./routes/studio");

const mongoURI =
  "mongodb+srv://studio:mueNMFYpTHy0GiQg@cluster0.ezylsct.mongodb.net/studioBooking?retryWrites=true&w=majority";
const PORT = "8800";
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL || mongoURI)
  .then(() => {
    console.log("MongoDB Database Connected Successfully");
  })
  .then(() =>
    app.listen(process.env.PORT || PORT, () => {
      console.log("Backend server is running on Port: ", PORT);
    })
  )
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World from studioAPP nginx");
  console.log("Hello World from studioAPP nginx")
});

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/booking", slotRoute);
app.use("/api/slot", createStudioRoute);
