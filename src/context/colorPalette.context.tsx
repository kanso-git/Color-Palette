import React, { createContext, Dispatch } from "react";
import IAction, { IState } from "../actions";

import colorPaletteReducer from "../reducers/colorPalette.reducer";
import { useLocalStorageReducer } from "../hooks/useLocalStorageReducer";
import seedPalettes from "../components/seedPalettes";

const defaultPalettes: IState = [...seedPalettes];
export const ColorPaletteContext = createContext<IState>(defaultPalettes);
export const DispatchContext = createContext({} as Dispatch<IAction>);

export function ColorPaletteProvider(props: any) {
  const [palettes, dispatch] = useLocalStorageReducer(
    "palettes",
    defaultPalettes,
    colorPaletteReducer
  );
  return (
    <ColorPaletteContext.Provider value={palettes}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </ColorPaletteContext.Provider>
  );
}
