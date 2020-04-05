import "./Palette.css";
import React, { useState } from "react";

import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";

export interface IColor {
  name: string;
  color: string;
}

export interface IPalette {
  id: string;
  paletteName: string;
  emoji: string;
  colors: IColor[];
}

export interface IColorExtended {
  name: string;
  id: string;
  hex: string;
  rgb: string;
  rgba: string;
}
export interface IPaletteExtended {
  id: string;
  paletteName: string;
  emoji: string;
  colors: {
    [key: number]: IColorExtended[];
  };
}

interface IPaletteProps {
  palette: IPaletteExtended;
}
const Palette = ({ palette }: IPaletteProps) => {
  const [level, setLevel] = useState(300);
  const [format, setFormat] = useState("hex");

  const handleSLiderChange = (val: number) => {
    //const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    setLevel(val);
  };
  const handleChangeSelect = (val: string) => {
    setFormat(val);
  };
  return (
    <div className="Palette">
      <Navbar
        sliderChange={handleSLiderChange}
        level={level}
        onChangeSelect={handleChangeSelect}
      />
      <div className="Palette-colors">
        {/** bunch of color boxes */}
        {palette.colors[level].map((c) => (
          <ColorBox
            key={c.hex}
            paletteId={palette.id}
            color={c}
            format={format}
          />
        ))}
      </div>
      <PaletteFooter palette={palette} />
    </div>
  );
};

export default Palette;
