import React from "react";
import { Route, Switch, RouteComponentProps } from "react-router-dom";
import Palette from "./components/Palette";
import seedPalettes from "./components/seedPalettes";
import { generatePalette } from "./components/colorHelper";
import PaletteList from "./components/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette";

function App() {
  const renderPalette = (props: RouteComponentProps<any>): JSX.Element => {
    const { id } = props.match.params;
    const palette = seedPalettes.find((p) => p.id === id);
    if (palette) {
      return <Palette palette={generatePalette(palette)} />;
    }
    return <h1 />;
  };

  const renderPaletteList = (props: RouteComponentProps<any>): JSX.Element => (
    <PaletteList />
  );

  const renderColorPalette = (props: RouteComponentProps<any>): JSX.Element => {
    const { paletteId, colorId } = props.match.params;

    const palette = seedPalettes.find((p) => p.id === paletteId);
    if (palette) {
      return (
        <SingleColorPalette
          palette={generatePalette(palette)}
          colorId={colorId}
          format="hex"
        />
      );
    }
    return <h1></h1>;
  };

  return (
    <Switch>
      <Route path="/" exact render={renderPaletteList} />
      <Route path="/palettes/:id" exact render={renderPalette} />
      <Route
        path="/palettes/:paletteId/:colorId"
        render={renderColorPalette}
      ></Route>
    </Switch>
  );
}

export default App;
