import React from "react";
import { SortableElement } from "react-sortable-hoc";
import styles from "../styles/DraggableColorBoxStyles";
import { NewColorProps } from "./NewPaletteForm";
import DeleteIcon from "@material-ui/icons/Delete";

interface DraggableColorBoxProps {
  colorProp: NewColorProps;
  deleteBoxByName: (name: string) => void;
  index: number;
}

const DraggableColorBox = SortableElement(
  ({ colorProp, deleteBoxByName }: DraggableColorBoxProps) => {
    const classes = styles();
    return (
      <div
        className={classes.root}
        style={{ backgroundColor: colorProp.color }}
      >
        <div className={classes.boxContent}>
          <span>{colorProp.name}</span>
          <span>
            <DeleteIcon
              className={classes.deleteIcon}
              onClick={() => deleteBoxByName(colorProp.name)}
            />
          </span>
        </div>
      </div>
    );
  }
);

export default DraggableColorBox;
