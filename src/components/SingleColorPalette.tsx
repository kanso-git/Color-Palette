import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/PaletteStyles";

import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { IPalette, IColorExtended } from "../actions";

interface SingleColorPaletteProps {
  palette: IPalette;
  colorId: string;
  format: string;
}

const SingleColorPalette = ({
  palette,
  colorId,
  format,
}: SingleColorPaletteProps) => {
  const classes = styles();
  const [formatVal, setFormaVal] = useState(format);
  const handleChangeSelect = (val: string) => {
    setFormaVal(val);
  };

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
      <Navbar onChangeSelect={handleChangeSelect} />
      <div className={classes.paletteColors}>
        {shades.slice(1).map((s, i) => (
          <ColorBox
            key={i}
            color={s}
            paletteId={palette.id}
            format={formatVal}
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
