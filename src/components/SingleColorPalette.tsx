import React from "react";
import { IPaletteExtended, IColorExtended, IColor } from "./Palette";
import ColorBox from "./ColorBox";
interface SingleColorPaletteProps {
  palette: IPaletteExtended;
  colorId: string;
}
const SingleColorPalette = ({ palette, colorId }: SingleColorPaletteProps) => {
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
    <div className="Palette">
      <div className="Palette-colors">
        {shades.slice(1).map((s, i) => (
          <ColorBox
            key={i}
            color={s}
            paletteId={palette.id}
            format="hex"
            withoutMoreLink
          />
        ))}
      </div>
    </div>
  );
};

export default SingleColorPalette;
