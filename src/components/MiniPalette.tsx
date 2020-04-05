import React from "react";
import { withRouter } from "react-router-dom";
import styles from "../styles/MiniPaletteStyles";
import { IColor } from "../actions";

const MiniPalette = ({ colors, id, paletteName, emoji, history }: any) => {
  const classes = styles();
  return (
    <div
      className={classes.root}
      onClick={() => history.push(`/palettes/${id}`)}
    >
      <div className={classes.colors}>
        {colors.map((c: IColor) => (
          <div
            key={c.name}
            className={classes.minColor}
            style={{ background: c.color }}
          ></div>
        ))}
      </div>
      <h5 className={classes.title}>
        {paletteName} <span>{emoji}</span>
      </h5>
    </div>
  );
};

export default withRouter(MiniPalette);
