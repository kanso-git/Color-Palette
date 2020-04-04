import React from "react";
import seedPalettes from "./seedPalettes";
import MiniPalette from "./MiniPalette";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    backgroundColor: "blue",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    color: "white",
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3,30%)",
    gridGap: "5%",
  },
});
const PaletteList = () => {
  const classes = useStyles();
  const miniPalettes = seedPalettes.map((p) => {
    return <MiniPalette key={p.id} {...p} />;
  });

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>Color Palette</h1>
        </nav>
        <div className={classes.palettes}>{miniPalettes}</div>
      </div>
    </div>
  );
};

export default PaletteList;
