import React, { useState, useContext } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import { ColorPaletteContext } from "../context/colorPalette.context";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";

const drawerWidth = 400;
const maxColorBoxInPalette = 20;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      display: "flex",
      alignItems: "center",
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
    container: {
      height: "100%",
      width: "90%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    btns: {
      width: "100%",
    },
    btn: {
      width: "50%",
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

  const [open, setOpen] = useState(false);
  const [colors, setColors] = useState<NewColorProps[]>(palettes[0].colors);

  const isPaletteFull = colors.length >= maxColorBoxInPalette;
  const handleDrawerClose = () => {
    setOpen(false);
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
      <PaletteFormNav open={open} setOpen={setOpen} colors={colors} />

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
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>

          <div className={classes.btns}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setColors([])}
              className={classes.btn}
            >
              Clear Palette
            </Button>
            <Button
              className={classes.btn}
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
          <ColorPickerForm
            colors={colors}
            isPaletteFull={isPaletteFull}
            setColors={setColors}
          />
        </div>
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
