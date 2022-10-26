/* Imports */
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Typography } from "@mui/material";
import styles from "./index.style";

import TextInput from "../../common/TextField";
import CurrencyChart from "../CurrencyChart";

function Forms() {
  /* States */
  const [openChart, setOpenChart] = useState(false);
  const [name, setName] = useState("");

  /* Constants */

  const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter valid email address.")
      .required("Email address cannot be empty."),
    firstName: Yup.string().required("First Name cannot be empty."),
  });

  /* Functions */
  const handleFormSubmit = () => {
    setOpenChart(!openChart);
  };

  /* Output */
  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          errors,
          values,
          handleBlur,
          handleSubmit,
          handleChange,
          isValid,
          touched,
        }) => (
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Box sx={styles.rootStyles}>
              <Container sx={styles.form}>
                <Box mb={3}>
                  <TextInput
                    fullWidth
                    name="firstName"
                    label="First Name"
                    required
                    value={values.firstName}
                    variant="outlined"
                    sx={styles.formInputStyle}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={String(touched.firstName && errors.firstName)}
                  />
                </Box>
                <Box mb={3}>
                  <TextInput
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    value={values.lastName}
                    variant="outlined"
                    sx={styles.formInputStyle}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={String(touched.lastName && errors.lastName)}
                  />
                </Box>
                <Box mb={3}>
                  <TextInput
                    fullWidth
                    name="email"
                    label="Email Address"
                    variant="outlined"
                    required
                    value={values.email}
                    sx={styles.formInputStyle}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    error={Boolean(touched.email && errors.email)}
                    helperText={String(touched.email && errors.email)}
                  />
                </Box>
                <Box mb={2}>
                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    disabled={!isValid}
                    variant="contained"
                    fontWeight="fontWeightRegular"
                    sx={styles.button}
                    onClick={setName(values.firstName)}
                  >
                    <Typography variant="body1" sx={{ color: "#FFFFFF" }}>
                      Submit
                    </Typography>
                  </Button>
                </Box>
              </Container>
            </Box>
          </Form>
        )}
      </Formik>
      {openChart && <CurrencyChart name={name} />}
    </Box>
  );
}

export default Forms;
