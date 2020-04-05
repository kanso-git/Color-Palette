import React from "react";
import { RGBColor } from "react-color";
import styles from "../styles/DraggableColorBoxStyles";
import { NewColorProps } from "./NewPaletteForm";

interface DraggableColorBoxProps {
  colorProp: NewColorProps;
}

const DraggableColorBox = ({ colorProp }: DraggableColorBoxProps) => {
  const classes = styles();
  return (
    <div className={classes.root} style={{ backgroundColor: colorProp.color }}>
      {colorProp.name}
    </div>
  );
};

export default DraggableColorBox;
