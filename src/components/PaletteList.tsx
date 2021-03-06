import React, { useContext } from "react";
import MiniPalette from "./MiniPalette";
import styles from "../styles/PaletteListStyles";
import { Link } from "react-router-dom";
import { ColorPaletteContext } from "../context/colorPalette.context";

const PaletteList = () => {
  const classes = styles();
  const palettes = useContext(ColorPaletteContext);

  const miniPalettes = palettes.map((p) => {
    return <MiniPalette key={p.id} {...p} />;
  });

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>Color Palette</h1>
          <Link to="/palettes/new">Create Palette</Link>
        </nav>
        <div className={classes.palettes}>{miniPalettes}</div>
      </div>
    </div>
  );
};

export default PaletteList;
