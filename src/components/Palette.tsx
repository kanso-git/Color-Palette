import React, { useState } from "react";
import styles from "../styles/PaletteStyles";

import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { IPalette, DEFAULT_LEVEL, DEFAULT_FORMAT } from "../actions";

interface IPaletteProps {
  palette: IPalette;
}

const Palette = (props: IPaletteProps) => {
  const { palette } = props;
  const classes = styles(props);

  const myLevel = palette.props
    ? palette.props.level
    : (DEFAULT_LEVEL as number);
  const myFormat = palette.props
    ? palette.props.format
    : (DEFAULT_FORMAT as string);

  const [level, setLevel] = useState(myLevel);
  const [format, setFormat] = useState(myFormat);

  const handleSLiderChange = (val: number) => {
    //const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    setLevel(val);
  };
  const handleChangeSelect = (val: string) => {
    setFormat(val);
  };
  return (
    <div className={classes.palette}>
      <Navbar
        sliderChange={handleSLiderChange}
        level={level}
        onChangeSelect={handleChangeSelect}
      />
      <div className={classes.paletteColors}>
        {/** bunch of color boxes */}
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
