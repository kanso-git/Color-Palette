import React, { useContext } from "react";
import { Route, Switch, RouteComponentProps } from "react-router-dom";
import Palette from "./components/Palette";
import { generatePaletteColors } from "./components/colorHelper";
import PaletteList from "./components/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette";
import NewPaletteForm from "./components/NewPaletteForm";
import Playground from "./components/Playground";
import { ColorPaletteContext } from "./context/colorPalette.context";

function App() {
  const palettes = useContext(ColorPaletteContext);

  const renderPalette = (props: RouteComponentProps<any>): JSX.Element => {
    const { id } = props.match.params;
    const palette = palettes.find((p) => p.id === id);
    if (palette) {
      palette.colorsExtended = generatePaletteColors(palette.colors);
      return <Palette palette={palette} />;
    }
    return <h1 />;
  };

  const renderColorPalette = (props: RouteComponentProps<any>): JSX.Element => {
    const { paletteId, colorId } = props.match.params;

    const palette = palettes.find((p) => p.id === paletteId);
    if (palette) {
      palette.colorsExtended = generatePaletteColors(palette.colors);
      return (
        <SingleColorPalette palette={palette} colorId={colorId} format="hex" />
      );
    }
    return <h1></h1>;
  };

  return (
    <Switch>
      <Route path="/" exact render={() => <PaletteList />} />
      <Route path="/palettes/new" exact render={() => <NewPaletteForm />} />
      <Route path="/palettes/:id" exact render={renderPalette} />
      <Route
        path="/palettes/:paletteId/:colorId"
        render={renderColorPalette}
      ></Route>
      <Route path="/playground" render={() => <Playground />}></Route>
    </Switch>
  );
}

export default App;
