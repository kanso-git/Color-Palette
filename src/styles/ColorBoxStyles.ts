import chroma from "chroma-js";
import { makeStyles } from "@material-ui/styles";
import { ColorBoxProps } from "../components/ColorBox";

export default makeStyles({
  colorBox: {
    width: "20%",
    height: ({ isForSinglePalette }: ColorBoxProps) => {
      return isForSinglePalette ? "50%" : "25%";
    },
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-4px",
    "&:hover button": {
      opacity: 1,
      transition: "0.5s",
    },
  },
  copyText: {
    color: ({ color }: ColorBoxProps) => {
      return chroma(color.rgb).luminance() >= 0.7 ? "black" : "white";
    },
  },
  colorName: {
    color: ({ color }: ColorBoxProps) => {
      return chroma(color.rgb).luminance() <= 0.08 ? "white" : "black";
    },
  },
  seeMore: {
    color: ({ color }: ColorBoxProps) => {
      return chroma(color.rgb).luminance() >= 0.7 ? "black" : "white";
    },
    background: "rgba(255, 255, 255, 0.3)",
    position: "absolute",
    right: "0px",
    bottom: "0px",
    border: "none",
    width: "60px",
    height: "30px",
    fontSize: "12px",
    textAlign: "center",
    lineHeight: "30px",
  },
  copyButton: {
    color: ({ color }: ColorBoxProps) => {
      return chroma(color.rgb).luminance() <= 0.08 ? "white" : "black";
    },
    width: "100px",
    height: "30px",
    position: "absolute",
    display: "inline-block",
    top: "50%",
    left: "50%",
    marginTop: "-15px",
    marginLeft: "-50px",
    textAlign: "center",
    outline: " none",
    background: "rgba(255, 255, 255, 0.3)",
    fontSize: "1rem",
    lineHeight: "30px",
    textTransform: "uppercase",
    border: "none",
    opacity: "0",
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: "black",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
  },

  copyOverlay: {
    opacity: 0,
    zIndex: 0,
    width: "100%",
    height: "100%",
    transition: "transform 0.6s ease-in-out",
    transform: "scale(0.1)",
  },
  copyOverlayShow: {
    opacity: 1,
    transform: "scale(10)",
    zIndex: 10,
    position: "absolute",
  },

  copyMsg: {
    position: "fixed",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    zIndex: 0,
    width: "100%",
    height: "100%",
    fontSize: "4rem",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    transform: "scale(0.1)",
    color: "white",
    "& h1": {
      fontWeight: 400,
      textShadow: "1px 2px black",
      background: "rgba(255, 255, 255, 0.2)",
      width: "100%",
      textAlign: "center",
      marginBottom: 0,
      padding: "1rem",
      textTransform: "uppercase",
    },
    "& p": {
      fontSize: "2rem",
      fontWeight: 100,
    },
  },
  copyMsgShow: {
    opacity: 1,
    transform: "scale(1)",
    zIndex: 25,
    transition: "all 0.4s ease-in-out",
    transitionDelay: "0.3s",
  },
});
