import "./ColorBox.css";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IColorExtended } from "./Palette";

interface ColorBoxProps {
  color: IColorExtended;
  format: string;
}
const ColorBox = ({ color, format }: ColorBoxProps) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <CopyToClipboard text={color.hex} onCopy={() => handleCopy()}>
      <div style={{ background: color.hex }} className="ColorBox">
        <div
          style={{ background: color.hex }}
          className={`copy-overlay  ${copied && " show"}`}
        />

        <div className={`copy-msg  ${copied && " show"}`}>
          <h1>copied</h1>
          <p>{color[format as "rgb" | "rgba" | "hex"]}</p>
        </div>
        <div className="copy-container">
          <div className="box-content">
            <span>{color.name}</span>
          </div>
          <button className="copy-button">Copy</button>
        </div>
        <span className="see-more"> More</span>
      </div>
    </CopyToClipboard>
  );
};

export default ColorBox;
