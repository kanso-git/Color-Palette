import React from "react";
import { withRouter, Link, RouteComponentProps } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { IPalette, IColor } from "./Palette";

const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      cursor: "pointer",
    },
  },
  colors: {
    backgroundColor: "#dae1e4",
    height: "150px",
    width: "100%",
    borderRadius: "5px",
    overflow: "hidden",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    position: "relative",
    "& span": {
      marginLeft: "0.5rem",
      fontSize: "1.5rem",
    },
  },
  minColor: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    position: "relative",
    marginBottom: "-4px",
  },
});
type TParams = { id: string | undefined };

const MiniPalette = ({ colors, id, paletteName, emoji, history }: any) => {
  const classes = useStyles();
  return (
    <div
      className={classes.root}
      onClick={() => history.push(`/palettes/${id}`)}
    >
      <div className={classes.colors}>
        {colors.map((c: IColor) => (
          <div
            key={c.name}
            className={classes.minColor}
            style={{ background: c.color }}
          ></div>
        ))}
      </div>
      <h5 className={classes.title}>
        {paletteName} <span>{emoji}</span>
      </h5>
    </div>
  );
};

export default withRouter(MiniPalette);
