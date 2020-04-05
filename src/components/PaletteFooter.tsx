import React from "react";
import { IPaletteExtended } from "./Palette";
interface PaletteFooterProps {
  palette: IPaletteExtended;
}
const PaletteFooter = ({ palette }: PaletteFooterProps) => {
  return (
    <footer className="Palette-footer">
      {palette.paletteName}
      <span className="emoji">{palette.emoji}</span>
    </footer>
  );
};

export default PaletteFooter;
