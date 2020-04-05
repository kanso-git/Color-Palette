import { useReducer, useEffect, Dispatch } from "react";
import IAction, { IState } from "../actions";

function useLocalStorageReducer(
  key: string,
  defaultVal: IState,
  reducer: any
): [IState, Dispatch<IAction>] {
  const [state, dispatch] = useReducer(reducer, defaultVal, () => {
    let value: IState;
    try {
      value = JSON.parse(
        window.localStorage.getItem(key) || String(defaultVal)
      );
    } catch (e) {
      value = defaultVal;
    }

    return value;
  });
  useEffect(() => {
    console.log("save to localstorage...");
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state as IState, dispatch];
}
export { useLocalStorageReducer };
