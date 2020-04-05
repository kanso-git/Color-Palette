import React from "react";
import { Route, Switch, RouteComponentProps } from "react-router-dom";
import Palette from "./components/Palette";
import PaletteList from "./components/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette";
import NewPaletteForm from "./components/NewPaletteForm";
import Playground from "./components/Playground";

function App() {
  const renderPalette = (props: RouteComponentProps<any>): JSX.Element => {
    const { id } = props.match.params;
    return <Palette paletteId={id} />;
  };

  const renderColorPalette = (props: RouteComponentProps<any>): JSX.Element => {
    const { paletteId, colorId } = props.match.params;
    return <SingleColorPalette paletteId={paletteId} colorId={colorId} />;
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
