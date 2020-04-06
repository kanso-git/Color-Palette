import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import DraggableColorBox from "./DraggableColorBox";
import { NewColorProps } from "./NewPaletteForm";

interface DraggableColorListProps {
  colors: NewColorProps[];
  deleteBoxByName: (name: string) => void;
  axis: string;
  onSortEnd: Function;
}
const DraggableColorList = SortableContainer(
  ({ colors, deleteBoxByName }: DraggableColorListProps) => {
    return (
      <div style={{ height: "100%" }}>
        {colors.map((prop: NewColorProps, i: number) => {
          return (
            <DraggableColorBox
              index={i}
              key={prop.name}
              colorProp={prop}
              deleteBoxByName={deleteBoxByName}
            />
          );
        })}
      </div>
    );
  }
);

export default DraggableColorList;
