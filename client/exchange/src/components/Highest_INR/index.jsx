/* Imports */
import { MenuList, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";

function HighestINR() {
  /* States */
  const [data, setData] = useState("INR");

  /* Functions */

  function sortObject(data) {
    var arr = [];
    for (var prop in data) {
      if (data.hasOwnProperty(prop)) {
        arr.push([prop, data[prop]]);
      }
    }
    arr.sort(function (a, b) {
      return a[1] - b[1];
    });
    return arr;
  }

  var arr = sortObject(data);

  /* Side effects */
  useEffect(() => {
    axios
      .post("http://localhost:5000/api/exchange-rates/get-exchange-rates", {
        code: "INR",
      })
      .then((res) => setData(res.data.result))
      .catch((err) => console.log(err));
  }, []);

  /* Output */
  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          display: "flex",
          justifyContent: "center",
          fontFamily: "Montserrat",
          paddingTop: 3,
          color: "#3A3845",
          fontWeight: 800,
        }}
      >
        Highest Values Compared to USD
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          paddingLeft: 3,
          justifyContent: "center",
          fontFamily: "Montserrat",
          paddingTop: 3,
        }}
      >
        {arr
          .slice(-5)
          .reverse()
          .map((item, index) => (
            <MenuList key={index}>
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "auto",
                  justifyContent: "center",
                  fontFamily: "Montserrat",
                  color: "#3A3845",
                  fontWeight: 400,
                }}
              >
                {index + 1}. {item[0]} - {item[1]}
              </Typography>
            </MenuList>
          ))}
      </Box>
    </Box>
  );
}

export default HighestINR;
