import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import CurrencyConverter from "../CurrencyConverter";
import HighestINR from "../Highest_INR";
import HighestUSD from "../Highest_USD";
import styles from "./index.style";

function Stats() {
  const [data, setData] = useState([]);
  console.log(data, "data");
  useEffect(() => {
    axios
      .post("http://localhost:5000/api/exchange-rates/get-exchange-rates", {
        code: "INR",
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box sx={{ padding: 10, bgcolor: "#D7C0AE", borderRadius: 4, margin: 2 }}>
      <Typography
        variant="h3"
        sx={{ textAlign: "center", fontFamily: "Montserrat", paddingBottom: 3 }}
      >
        INTERESTING STATS
      </Typography>
      <Box sx={styles.boxContainer}>
        <Container
          sx={{
            height: 400,
            bgcolor: "#EEE3CB",
            color: "#3A3845",
            fontWeight: 400,
            borderRadius: 2,
            boxShadow: " 2px 2px 2px 1px rgba(0, 0, 0, 0.6)",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              paddingTop: 2,
              color: "#3A3845",
              fontWeight: 800,
              fontFamily: "Montserrat",
            }}
          >
            Current USD vs INR
          </Typography>
          <Box sx={{ margin: "auto", paddingTop: 5 }}>
            {data.length !== 0 && (
              <>
                <Typography
                  variant="h4"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontFamily: "Montserrat",
                  }}
                >
                  1 Rupee
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontFamily: "Montserrat",
                  }}
                >
                  =
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontFamily: "Montserrat",
                  }}
                >
                  ${data.result["USD"]} USD
                </Typography>
              </>
            )}
          </Box>
        </Container>
        {/* <Container sx={{ height: 400, bgcolor: "orange", borderRadius: 4 }}>
          <Typography>Currency Converter</Typography>
          <CurrencyConverter />
        </Container> */}
        <Container
          sx={{
            height: 400,
            bgcolor: "#EEE3CB",
            borderRadius: 2,
            boxShadow: " 2px 2px 2px 1px rgba(0, 0, 0, 0.6)",
          }}
        >
          <HighestUSD />
        </Container>
        <Container
          sx={{
            height: 400,
            bgcolor: "#EEE3CB",
            borderRadius: 2,
            boxShadow: " 2px 2px 2px 1px rgba(0, 0, 0, 0.6)",
          }}
        >
          <HighestINR />
        </Container>
      </Box>
    </Box>
  );
}

export default Stats;
