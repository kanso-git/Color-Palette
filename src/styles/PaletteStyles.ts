import { makeStyles } from "@material-ui/styles";

export default makeStyles({
  palette: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  paletteColors: {
    height: "90%",
  },

  goBack: {
    width: "20%",
    height: "50%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-4px",
    backgroundColor: "black",
    "& a ": {
      width: "100px",
      height: "30px",
      position: "absolute",
      display: "inline-block",
      backgroundColor: "rgba(255,255,255,0.3)",
      top: "50%",
      left: "50%",
      marginTop: "-15px",
      marginLeft: "-50px",
      textAlign: "center",
      outline: "none",
      lineHeight: "30px",
      color: "white",
      textTransform: "uppercase",
      border: "none",
      opacity: 1,
      textDecoration: "none",
    },
  },
});
