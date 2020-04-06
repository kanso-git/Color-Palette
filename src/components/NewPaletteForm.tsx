import React, { useState, useEffect, useContext } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import { ChromePicker, ColorResult } from "react-color";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import DraggableColorBox from "./DraggableColorBox";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { IPalette, EActionType } from "../actions";
import {
  DispatchContext,
  ColorPaletteContext,
} from "../context/colorPalette.context";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";

const drawerWidth = 400;
const maxColorBoxInPalette = 20;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      height: "calc(100vh - 64px)",
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  })
);

export interface NewColorProps {
  color: string;
  name: string;
}

const NewPaletteForm = (props: RouteComponentProps) => {
  const classes = useStyles();
  const palettes = useContext(ColorPaletteContext);
  const theme = useTheme();

  const dispatch = useContext(DispatchContext);

  const [open, setOpen] = useState(false);
  const [colors, setColors] = useState<NewColorProps[]>(palettes[0].colors);
  const [color, setColor] = useState<string>("yellow");
  const [colorName, setColorName] = useState<string>("");
  const [paletteName, setPaletteName] = useState<string>("");

  const isPaletteFull = colors.length >= maxColorBoxInPalette;

  useEffect(() => {
    ValidatorForm.addValidationRule("colorNameUnique", (value) => {
      if (colors.find((c) => c.name.toLowerCase() === value.toLowerCase())) {
        return false;
      }
      return true;
    });

    ValidatorForm.addValidationRule("colorUnique", () => {
      console.log(color);
      if (colors.find((c) => c.color === color)) {
        return false;
      }
      return true;
    });

    ValidatorForm.addValidationRule("paletteNameUnique", (value) => {
      if (
        palettes.find(
          (p) => p.paletteName.toLowerCase() === value.toLowerCase()
        )
      ) {
        return false;
      }
      return true;
    });

    return () => {
      ValidatorForm.removeValidationRule("colorNameUnique");
      ValidatorForm.removeValidationRule("colorUnique");
      ValidatorForm.removeValidationRule("paletteNameUnique");
    };
  }, [color, colorName, paletteName]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleColorChangeComplete = (color: ColorResult) => {
    setColor(color.hex);
  };

  const handleAddNewColor = () => {
    const newColor = {
      color,
      name: colorName,
    };
    setColors(colors.concat(newColor));
    setColorName("");
  };

  const handleNewNameChange = (e: any) => {
    setColorName(e.target.value);
  };

  const handlePaletteNameChange = (e: any) => {
    setPaletteName(e.target.value);
  };

  const handleSavePalette = () => {
    const newPalette: IPalette = {
      id: paletteName.trim().replace(/\s/g, "-"),
      paletteName: paletteName,
      emoji: "FR",
      colors,
      colorsExtended: {},
    };
    dispatch({
      type: EActionType.ADD,
      payload: {
        newPalette,
      },
    });
    props.history.push("/");
  };

  const handleDeleteBoxByName = (name: string) => {
    const newcolors = colors.filter((c) => c.name !== name);
    setColors(newcolors);
  };

  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  const addRandomColor = () => {
    const allColors = palettes.map((p) => p.colors).flat();
    const randIndex = Math.floor(Math.random() * allColors.length);
    const randColor = allColors[randIndex];
    if (randColor) {
      setColors(colors.concat(randColor));
    }
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
          <ValidatorForm
            onSubmit={handleSavePalette}
            onError={() => alert("on error")}
          >
            <TextValidator
              name={paletteName}
              value={paletteName}
              onChange={handlePaletteNameChange}
              validators={["required", "paletteNameUnique"]}
              errorMessages={[
                "this field is required",
                "Palette Name Already Taken",
              ]}
            />

            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Typography variant="h4">Design Your Palette</Typography>

        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setColors([])}
          >
            Clear Palette
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={addRandomColor}
            style={{
              backgroundColor: isPaletteFull ? "grey" : "",
            }}
            disabled={isPaletteFull}
          >
            Random Color
          </Button>
        </div>

        <ChromePicker
          color={color}
          onChangeComplete={handleColorChangeComplete}
        />

        <ValidatorForm
          onSubmit={handleAddNewColor}
          onError={() => alert("on error")}
        >
          <TextValidator
            name={colorName}
            value={colorName}
            onChange={handleNewNameChange}
            validators={["required", "colorNameUnique", "colorUnique"]}
            errorMessages={[
              "this field is required",
              "Color Name Already Taken",
              "RGBA Color already Taken",
            ]}
          />

          <Button
            variant="contained"
            disabled={isPaletteFull}
            color="primary"
            type="submit"
            style={{
              backgroundColor: isPaletteFull ? "grey" : color,
            }}
          >
            {isPaletteFull ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={colors}
          deleteBoxByName={handleDeleteBoxByName}
          axis="xy"
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  );
};

export default withRouter(NewPaletteForm);
