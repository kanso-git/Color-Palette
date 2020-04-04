import "./ColorBox.css";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IColorExtended } from "./Palette";
import { Link } from "react-router-dom";

interface ColorBoxProps {
  color: IColorExtended;
  paletteId: string;
  format: string;
  withoutMoreLink?: boolean;
}
const ColorBox = ({
  paletteId,
  color,
  format,
  withoutMoreLink,
}: ColorBoxProps) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const myColor = color[format as "rgb" | "rgba" | "hex"];
  return (
    <CopyToClipboard text={myColor} onCopy={() => handleCopy()}>
      <div style={{ background: myColor }} className="ColorBox">
        <div
          style={{ background: myColor }}
          className={`copy-overlay  ${copied && " show"}`}
        />

        <div className={`copy-msg  ${copied && " show"}`}>
          <h1>copied</h1>
          <p>{myColor}</p>
        </div>
        <div className="copy-container">
          <div className="box-content">
            <span>{color.name}</span>
          </div>
          <button className="copy-button">Copy</button>
        </div>
        {withoutMoreLink || (
          <Link
            to={`/palettes/${paletteId}/${color.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="see-more"> More</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
};

export default ColorBox;
