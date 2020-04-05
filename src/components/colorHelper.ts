import chroma from "chroma-js";
import { IColor, IColorExtended } from "../actions";
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generatePaletteColors(
  starterPaletteColors: IColor[]
): { [key: number]: IColorExtended[] } {
  let colors: { [key: number]: IColorExtended[] } = {};

  for (let level of levels) {
    colors[level] = [];
  }
  for (let color of starterPaletteColors) {
    let scale = getScale(color.color, 10).reverse();
    for (let i in scale) {
      colors[levels[i]].push({
        name: `${color.name} ${levels[i]}`,
        id: color.name.toLowerCase().replace(/ /g, "-"),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i])
          .css()
          .replace("rgb", "rgba")
          .replace(")", ",1.0)"),
      });
    }
  }
  return colors;
}
function getRange(hexColor: string) {
  const end = "#fff";
  return [chroma(hexColor).darken(1.4).hex(), hexColor, end];
}

function getScale(hexColor: string, numberOfColors: number) {
  return chroma.scale(getRange(hexColor)).mode("lab").colors(numberOfColors);
}

export { generatePaletteColors };
