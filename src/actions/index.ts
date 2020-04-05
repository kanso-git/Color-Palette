export enum EActionType {
  ADD = "ADD",
  REMOVE = "REMOVE",
  EDIT = "EDIT",
  CHANGE_PROPS = "CHANGE_PROPS",
}
export default interface IAction {
  type: EActionType;
  payload: any;
}

export interface IColor {
  name: string;
  color: string;
}

export interface IColorExtended {
  name: string;
  id: string;
  hex: string;
  rgb: string;
  rgba: string;
}

export enum EColorFormat {
  HEX = "hex",
  RGB = "rgb",
  RGBA = "rgba",
}
export type LEVEL = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type COLOR_FORMAT = "hex" | "rgb" | "rgba";
export const DEFAULT_LEVEL = 500;
export const DEFAULT_FORMAT = EColorFormat.HEX;

export interface IPalette {
  id: string;
  paletteName: string;
  emoji: string;
  colors: IColor[];
  colorsExtended: { [key: number]: IColorExtended[] };
  props?: {
    format: COLOR_FORMAT;
    level: LEVEL;
  };
}

export type IState = IPalette[];
