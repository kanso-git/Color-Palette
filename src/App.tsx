import React from "react";
import Palette from "./components/Palette";
import seedPalettes from "./components/seedPalettes";
import { generatePalette } from "./components/colorHelper";

function App() {
  return (
    <div>
      <Palette palette={generatePalette(seedPalettes[3])} />
    </div>
  );
}

export default App;
