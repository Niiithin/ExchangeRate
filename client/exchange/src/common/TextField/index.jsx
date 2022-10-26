/* Imports */
import React from "react";

import {
  FormControl,
  FormHelperText,
  FormLabel,
  OutlinedInput,
} from "@mui/material";

/* local Imports */
import styles from "./index.style";

function TextInput({
  name,
  label = "",
  size = "large",
  required = false,
  error = false,
  helperText = "",
  ...other
}) {
  /* Output */
  return (
    <FormControl fullWidth required={required} size={size} error={error}>
      {label && (
        <FormLabel sx={styles.formLabelStyle} htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <OutlinedInput fullWidth id={name} name={name} {...other} />
      {error && helperText && (
        <FormHelperText sx={styles.formHelperTextStyle} error>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default TextInput;
