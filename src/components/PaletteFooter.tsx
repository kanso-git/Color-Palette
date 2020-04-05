import React from "react";
import styles from "../styles/FooterStyles";
import { IPalette } from "../actions";
interface PaletteFooterProps {
  palette: IPalette;
}

const PaletteFooter = ({ palette }: PaletteFooterProps) => {
  const classes = styles();
  return (
    <footer className={classes.paletteFooter}>
      {palette.paletteName}
      <span className={classes.emoji}>{palette.emoji}</span>
    </footer>
  );
};

export default PaletteFooter;
