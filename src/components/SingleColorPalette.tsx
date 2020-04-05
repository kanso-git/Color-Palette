import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/PaletteStyles";

import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { IPalette, IColorExtended, DEFAULT_FORMAT } from "../actions";
import { ColorPaletteContext } from "../context/colorPalette.context";
import { generatePaletteColors } from "./colorHelper";

interface SingleColorPaletteProps {
  paletteId: string;
  colorId: string;
}

const SingleColorPalette = ({
  paletteId,
  colorId,
}: SingleColorPaletteProps) => {
  const classes = styles();
  const palettes = useContext(ColorPaletteContext);

  const palette = palettes.find((p) => p.id === paletteId) as IPalette;
  if (Object.keys(palette.colorsExtended).length === 0) {
    palette.colorsExtended = generatePaletteColors(palette.colors);
  }

  const format: string = palette.props ? palette.props.format : DEFAULT_FORMAT;
  const { colorsExtended } = palette;
  const keys = Object.keys(colorsExtended);
  const shades: IColorExtended[] = [];
  keys.forEach((key) => {
    shades.push(
      colorsExtended[(key as unknown) as number].find(
        (c) => c.id === colorId
      ) as IColorExtended
    );
  });

  return (
    <div className={classes.palette}>
      <Navbar palette={palette} isSingleColorPalette={true} />
      <div className={classes.paletteColors}>
        {shades.slice(1).map((s, i) => (
          <ColorBox
            key={i}
            color={s}
            paletteId={palette.id}
            format={format}
            isForSinglePalette
          />
        ))}
        <div className={classes.goBack}>
          <Link to={`/palettes/${palette.id}`}>Go Back</Link>
        </div>
      </div>
      <PaletteFooter palette={palette} />
    </div>
  );
};

export default SingleColorPalette;
