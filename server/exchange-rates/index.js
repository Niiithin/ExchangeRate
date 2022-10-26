const express = require("express");
const router = express.Router();
const { API_KEY } = require("../constants");
const axios = require("axios");

router.get("/", (req, res) => {
  res.status(200).json({ message: "Exchange rate api check" });
});

//API TO GET ALL THE EXCHANGE CODES
router.get("/get-exchange-codes", (req, res) => {
  axios
    .get(`https://v6.exchangerate-api.com/v6/${API_KEY}/codes`)
    .then((result) =>
      res.status(200).json({ result: result.data.supported_codes })
    )
    .catch((e) => res.status(400).json({ message: "ERROR" }));
});

//GET EXCHANGE RATES
router.post("/get-exchange-rates", (req, res) => {
  const data = req.body;
  const code = data["code"];
  axios
    .get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${code}`)
    .then((result) =>
      res.status(200).json({ result: result.data.conversion_rates })
    )
    .catch((e) => res.status(400).json({ message: "ERROR" }));
});

module.exports = router;
