export default {
  boxContainer: (theme) => ({
    display: "flex",
    // flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // flexWrap: "wrap",
    padding: 5,
    gap: 3,
    [theme.breakpoints.down(1000)]: {
      flexWrap: "wrap",
      padding: theme.spacing(5, 15, 0, 15),
    },
    [theme.breakpoints.down(500)]: {
      flexWrap: "wrap",
      padding: theme.spacing(5, 5, 0, 5),
    },
  }),
};
