import IAction, {
  IState,
  DEFAULT_FORMAT,
  DEFAULT_LEVEL,
  EActionType,
} from "../actions";

const reducer = (palettes: IState, action: IAction) => {
  console.log(action.type);
  switch (action.type) {
    case EActionType.ADD:
      return [
        ...palettes,
        {
          ...action.payload.palette,
          props: {
            format: DEFAULT_FORMAT,
            LEVEL: DEFAULT_LEVEL,
          },
        },
      ];

    case EActionType.REMOVE:
      return palettes.filter((palette) => palette.id !== action.payload.id);

    case EActionType.CHANGE_PROPS:
      return palettes.map((palette) =>
        palette.id === action.payload.id
          ? { ...palette, props: action.payload.newProps }
          : palette
      );

    case EActionType.EDIT:
      return palettes.map((palette) =>
        palette.id === action.payload.id
          ? { ...palette, ...action.payload.newPalette }
          : palette
      );

    default:
      return palettes;
  }
};
export default reducer;
