import React, { memo, useContext } from "react";
import { withRouter } from "react-router-dom";
import styles from "../styles/MiniPaletteStyles";
import DeleteIcon from "@material-ui/icons/Delete";
import { IColor, EActionType } from "../actions";
import { DispatchContext } from "../context/colorPalette.context";

const MiniPalette = ({ colors, id, paletteName, emoji, history }: any) => {
  const classes = styles();
  const dispatch = useContext(DispatchContext);
  return (
    <div
      className={classes.root}
      onClick={() => history.push(`/palettes/${id}`)}
    >
      <div>
        <DeleteIcon
          className={classes.deleteIcon}
          style={{ transition: "all 0.3s ease-in-out" }}
          onClick={(e) => {
            e.stopPropagation();
            dispatch({
              type: EActionType.REMOVE,
              payload: {
                id,
              },
            });
          }}
        />
      </div>
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

export default memo(withRouter(MiniPalette));
