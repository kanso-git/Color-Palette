import React, { ChangeEvent, useState, useContext } from "react";

import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import { MenuItem, IconButton } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";

import "rc-slider/assets/index.css";
import styles from "../styles/NavbarStyles";
import {
  IPalette,
  DEFAULT_LEVEL,
  EActionType,
  DEFAULT_FORMAT,
} from "../actions";
import { DispatchContext } from "../context/colorPalette.context";

interface INavbarProps {
  isSingleColorPalette: boolean;
  palette: IPalette;
}

const Navbar = ({ isSingleColorPalette, palette }: INavbarProps) => {
  const classes = styles();

  const dispatch = useContext(DispatchContext);
  const level: number = palette.props ? palette.props.level : DEFAULT_LEVEL;
  const format: string = palette.props ? palette.props.format : DEFAULT_FORMAT;

  const [snackOpened, setSnackOpened] = useState(false);

  const handleCloseSnackbar = () => {
    setSnackOpened(false);
  };

  const sliderChange = (val: number) => {
    dispatch({
      type: EActionType.CHANGE_PROPS,
      payload: {
        id: palette.id,
        newProps: {
          format: format,
          level: val,
        },
      },
    });
  };
  return (
    <header className={classes.Navbar}>
      <div className={classes.logo}>
        <Link to="/">Color Palette</Link>
      </div>
      {!isSingleColorPalette && (
        <div>
          <span>Level:{level}</span>
          <div className={classes.slider}>
            <Slider
              step={100}
              min={100}
              max={900}
              defaultValue={level}
              onAfterChange={sliderChange}
            />
          </div>
        </div>
      )}

      <div className={classes.selectContainer}>
        <Select
          onChange={(e: ChangeEvent<any>) => {
            const val = e.target.value;
            setSnackOpened(true);
            dispatch({
              type: EActionType.CHANGE_PROPS,
              payload: {
                id: palette.id,
                newProps: {
                  format: val,
                  level: level,
                },
              },
            });
          }}
          value={format}
        >
          <MenuItem value="hex">HEX - #ffffff</MenuItem>
          <MenuItem value="rgb">RGB - rgb(255,255,255) </MenuItem>
          <MenuItem value="rgba">RGBA - rgba(255,255,255,0.1)</MenuItem>
        </Select>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={snackOpened}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={
          <span id="message-id">Format Changed! to {format.toUpperCase()}</span>
        }
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        action={[
          <IconButton
            key="closeIcon"
            color="inherit"
            aria-label="close"
            onClick={() => setSnackOpened(false)}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </header>
  );
};

export default Navbar;
