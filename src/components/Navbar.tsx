import React, { ChangeEvent, useState } from "react";

import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import { MenuItem, IconButton } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";

import "rc-slider/assets/index.css";
import styles from "../styles/NavbarStyles";

interface INavbarProps {
  sliderChange?: (val: number) => void;
  onChangeSelect: (val: string) => void;
  level?: number;
}

const Navbar = ({ level, sliderChange, onChangeSelect }: INavbarProps) => {
  const classes = styles();
  const [format, setFormat] = useState("hex");
  const [snackOpened, setSnackOpened] = useState(false);

  const handleCloseSnackbar = () => {
    setSnackOpened(false);
  };
  return (
    <header className={classes.Navbar}>
      <div className={classes.logo}>
        <Link to="/">Color Palette</Link>
      </div>
      {sliderChange && (
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
            setFormat(val);
            setSnackOpened(true);
            onChangeSelect(val);
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
        autoHideDuration={6000}
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
