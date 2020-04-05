import React, { useContext } from "react";
import styles from "../styles/PaletteStyles";

import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { IPalette, DEFAULT_LEVEL, DEFAULT_FORMAT } from "../actions";
import { ColorPaletteContext } from "../context/colorPalette.context";
import { generatePaletteColors } from "./colorHelper";

interface IPaletteProps {
  paletteId: string;
}

const Palette = (props: IPaletteProps) => {
  const classes = styles(props);

  const { paletteId } = props;
  const palettes = useContext(ColorPaletteContext);

  const palette = palettes.find((p) => p.id === paletteId) as IPalette;
  if (Object.keys(palette.colorsExtended).length === 0) {
    palette.colorsExtended = generatePaletteColors(palette.colors);
  }

  const level: number = palette.props ? palette.props.level : DEFAULT_LEVEL;
  const format: string = palette.props ? palette.props.format : DEFAULT_FORMAT;

  return (
    <div className={classes.palette}>
      <Navbar palette={palette} isSingleColorPalette={false} />
      <div className={classes.paletteColors}>
        {palette.colorsExtended[level].map((c) => (
          <ColorBox
            key={c.hex}
            paletteId={palette.id}
            color={c}
            format={format}
            isForSinglePalette={false}
          />
        ))}
      </div>
      <PaletteFooter palette={palette} />
    </div>
  );
};

export default Palette;
