import React, { useState } from "react";
import { IPaletteExtended, IColorExtended, IColor } from "./Palette";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { Link } from "react-router-dom";
interface SingleColorPaletteProps {
  palette: IPaletteExtended;
  colorId: string;
  format: string;
}
const SingleColorPalette = ({
  palette,
  colorId,
  format,
}: SingleColorPaletteProps) => {
  const [formatVal, setFormaVal] = useState(format);
  const handleChangeSelect = (val: string) => {
    setFormaVal(val);
  };

  const { colors } = palette;
  const keys = Object.keys(colors);
  const shades: IColorExtended[] = [];
  keys.forEach((key) => {
    shades.push(
      colors[(key as unknown) as number].find(
        (c) => c.id === colorId
      ) as IColorExtended
    );
  });

  return (
    <div className="SingleColorPalette Palette">
      <Navbar onChangeSelect={handleChangeSelect} />
      <div className="Palette-colors">
        {shades.slice(1).map((s, i) => (
          <ColorBox
            key={i}
            color={s}
            paletteId={palette.id}
            format={formatVal}
            withoutMoreLink
          />
        ))}
        <div className="go-back ColorBox">
          <Link to={`/palettes/${palette.id}`} className="back-button">
            Go Back
          </Link>
        </div>
      </div>
      <PaletteFooter palette={palette} />
    </div>
  );
};

export default SingleColorPalette;
