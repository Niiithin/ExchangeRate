import {
  Box,
  FormControl,
  FormLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import BarChart from "../../common/BarChart";

function CurrencyChart({ name }) {
  /* States */
  const [data, setData] = useState([]);
  const [countryCode, setCountryCode] = useState("INR");
  const [country, setCountry] = useState("0");
  const [currencyList, setCurrencyList] = useState([]);
  const [countryData, setCountryData] = useState([
    {
      id: 0,
      country: "United States Dollar",
      currency: "USD",
      comparedRate: "82",
    },
    {
      id: 1,
      country: "Indian Rupee",
      currency: "BAM",
      comparedRate: "81",
    },

    {
      id: 2,
      country: "Singapore Dollar",
      currency: "SGD",
      comparedRate: "100",
    },

    {
      id: 3,
      country: "Chinese Renminbi",
      currency: "CNY",
      comparedRate: "20",
    },
    {
      id: 3,
      country: "Australian Dollor",
      currency: "AUD",
      comparedRate: "20",
    },
  ]);
  /* Constants */
  const datas = countryData.map((cdata) => cdata.comparedRate);
  const initialState = {
    labels: countryData.map((cdata) => cdata.country),
    datasets: [
      {
        label: "Currency Rate",
        data: datas,
        backgroundColor: ["red", "blue"],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };
  let delayed;
  const options = {
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default" && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Exchange Rate Bar Chart",
      },
    },
  };
  const [userData, setUserData] = useState(initialState);

  var newData = [];
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
  const handleChange = (event) => {
    setCountry(event.target.value);
    setCountryCode(currencyList[country][0]);
    newData = [];
    countryData.map((item) =>
      newData.push(data.result[item.currency].toString())
    );
    console.log(data, "newData");
    console.log(countryCode, "countryCode");

    setUserData((current) => {
      return {
        ...current,
        datasets: [
          {
            label: "Currency Rate",
            data: newData,
            backgroundColor: ["red", "blue"],
            borderColor: "black",
            borderWidth: 1,
          },
        ],
      };
    });
  };

  /* Side-Effects */
  useEffect(() => {
    axios
      .post("http://localhost:5000/api/exchange-rates/get-exchange-rates", {
        code: countryCode,
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [country]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/exchange-rates/get-exchange-codes")
      .then((res) => setCurrencyList(res.data.result))
      .catch((err) => console.log(err));
  }, []);
  /* Output */
  return (
    <Box sx={{ padding: 3 }} mb={2}>
      <Stack
        direction="row"
        gap={10}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",

          // alignItems: "center",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              minwidth: 180,
              padding: 5,
              bgcolor: "#150050",
              color: "#FFFFFF",
              borderRadius: 4,
            }}
          >
            <Typography
              variant="h4"
              sx={{ paddingBottom: 2, fontFamily: "Montserrat" }}
            >
              Welcome, {name} 🎉
            </Typography>
            <FormControl fullWidth>
              <FormLabel
                id="demo-simple-select-label"
                sx={{
                  position: "relative",
                  marginBottom: 1,
                  width: "100%",
                  color: "white",
                }}
              >
                Select a Currency
              </FormLabel>
              <Select
                displayEmpty
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={country}
                MenuProps={MenuProps}
                label="Currency"
                input={<OutlinedInput />}
                onChange={handleChange}
                sx={{ bgcolor: "#FFFFFF" }}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem disabled value="">
                  <em>Select a currency</em>
                </MenuItem>
                {currencyList.map((item, id) => (
                  <MenuItem value={id}>
                    <Typography sx={{ color: "black" }}>
                      {item[0]} {item[1]}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box
          maxWidth="xs"
          sx={{
            // height: 400,
            flex: 2,
            width: 400,
            // margin: "auto",
            // marginTop: 5,
            padding: 3,
            borderRadius: 4,
            bgcolor: "#81C6E8",
            color: "white",
          }}
        >
          <BarChart data={userData} options={options} />
        </Box>
      </Stack>
    </Box>
  );
}

export default CurrencyChart;

// `${currencyList[country][0]}`
