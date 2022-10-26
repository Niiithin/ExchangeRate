const express = require("express");

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());
// Post Req Body Check
app.post("/api", function (req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({
      Status: {
        ResponseCode: 400,
        ResponseMessage: "Bad Request!",
      },
    });
  } else {
    next();
  }
});

// using the api defined in student and teacher folder
app.use("/api/exchange-rates", require("./exchange-rates/index"));

//test the api
app.get("/api/", (req, res) => {
  res.status(200).send("API IS RUNNING!");
});

app.use("/", (req, res) => {
  res.status(200).send("Welcome to Exchange Rate Portal !!");
});

//create server on the port 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
