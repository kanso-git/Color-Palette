import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import styles from "../styles/ColorBoxStyles";
import { Link } from "react-router-dom";
import { IColorExtended } from "../actions";

export interface ColorBoxProps {
  color: IColorExtended;
  paletteId: string;
  format: string;
  isForSinglePalette: boolean;
}

const ColorBox = (props: ColorBoxProps) => {
  const classes = styles(props);
  const { paletteId, color, format, isForSinglePalette } = props;

  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const myColor = color[format as "rgb" | "rgba" | "hex"];
  return (
    <CopyToClipboard text={myColor} onCopy={() => handleCopy()}>
      <div style={{ background: myColor }} className={classes.colorBox}>
        <div
          style={{ background: myColor }}
          className={` ${classes.copyOverlay}  ${
            copied && classes.copyOverlayShow
          }`}
        />

        <div className={`${classes.copyMsg}  ${copied && classes.copyMsgShow}`}>
          <h1>copied</h1>
          <p className={classes.copyText}>{myColor}</p>
        </div>
        <div>
          <div className={classes.boxContent}>
            <span className={classes.colorName}>{color.name}</span>
          </div>
          {/**`copy-button ${isLightColor && "dark-text"}` */}
          <button className={classes.copyButton}>Copy</button>
        </div>
        {!isForSinglePalette && (
          <Link
            to={`/palettes/${paletteId}/${color.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={classes.seeMore}>More</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
};

export default ColorBox;
