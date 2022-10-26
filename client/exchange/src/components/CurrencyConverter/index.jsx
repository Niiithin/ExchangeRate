import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TextInput from "../../common/TextField";

function CurrencyConverter() {
  /* States */
  const [data, setData] = useState([]);
  const [amount, setAmount] = useState();
  const [countryList, setCountryList] = useState([]);
  const [fromCountry, setFromCountry] = useState("");
  const [countryCode, setCountryCode] = useState("AED");
  const [toCountry, setToCountry] = useState("");

  /* Constants */
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  /* Functions */
  const handleFromCountryChange = (event) => {
    setFromCountry(event.target.value);
    setCountryCode(countryList[fromCountry][0]);
  };

  const handleToCountryChange = (event) => {
    setToCountry(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  /* Side Effects */
  useEffect(() => {
    axios
      .post("http://localhost:5000/api/exchange-rates/get-exchange-rates", {
        code: countryCode,
      })
      .then((res) => setData(res.data.result))
      .catch((err) => console.log(err));
  }, [fromCountry]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/exchange-rates/get-exchange-codes")
      .then((res) => setCountryList(res.data.result))
      .catch((err) => console.log(err));
  }, []);

  /* Output */
  return (
    <Stack gap={3}>
      <TextInput
        fullWidth
        name="Amount"
        label="Amount"
        required
        value={amount}
        variant="outlined"
        onChange={handleAmountChange}
      />
      <Box
        sx={{
          width: "75%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 2,
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">From Country</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={fromCountry}
            MenuProps={MenuProps}
            label="From Country"
            onChange={handleFromCountryChange}
          >
            {countryList.map((item, id) => (
              <MenuItem value={id}>
                <Typography sx={{ color: "black" }}>
                  {item[0]} {item[1]}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          width: "75%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">To Country</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={toCountry}
            MenuProps={MenuProps}
            label="From Country"
            onChange={handleToCountryChange}
          >
            {countryList.map((item, id) => (
              <MenuItem value={id}>
                <Typography sx={{ color: "black" }}>
                  {item[0]} {item[1]}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {/* <Typography>{amount * fromCountryAmount}</Typography> */}
    </Stack>
  );
}

export default CurrencyConverter;
