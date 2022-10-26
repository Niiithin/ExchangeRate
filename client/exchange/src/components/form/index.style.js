export default {
  rootStyles: () => ({
    padding: 5,
  }),
  form: (theme) => ({
    width: 500,
    bgcolor: "white",
    padding: 2,
    borderRadius: 2,
    [theme.breakpoints.down(500)]: {
      width: 300,
    },
  }),
  roootStyles: () => ({
    bgcolor: "grey",
  }),
  formLabelStyle: (theme) => ({
    position: "relative",
    marginBottom: theme.spacing(1),
    width: "100%",
  }),
  button: (theme) => ({
    bgcolor: "#5837D0",
  }),
  formInputStyle: (theme) => ({
    paddingLeft: 0,
    "& .MuiSelect-select": {
      height: 48,
      padding: theme.spacing(2, 1.5),
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  }),
  formHelperTextStyle: (theme) => ({
    marginLeft: theme.spacing(0.5),
    marginTop: theme.spacing(0.5),
  }),
};
