import React, { useContext, useState } from "react";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {
  ColorPaletteContext,
  DispatchContext,
} from "../context/colorPalette.context";
import { IPalette, EActionType } from "../actions";
import { Button } from "@material-ui/core";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";

const drawerWidth = 400;

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

      flexDirection: "row",
      justifyContent: "space-between",
      height: "64px",
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
    navBtns: {},
  })
);

const PaletteFormNav = (props: any) => {
  const classes = useStyles();
  const schemaPaletteNameValidation = yup.object().shape({
    paletteName: yup.string().min(3).required("Palette name already used"),
  });
  const { open, setOpen, colors } = props;
  const palettes = useContext(ColorPaletteContext);
  const dispatch = useContext(DispatchContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <div>
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
            Create a palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
          <Formik
            initialValues={{ paletteName: "" }}
            validationSchema={schemaPaletteNameValidation}
            onSubmit={(values, actions) => {
              const findPaletteName = palettes.find(
                (p) =>
                  p.paletteName.toLowerCase() ===
                  values.paletteName.toLowerCase()
              );
              if (findPaletteName) {
                actions.setErrors({
                  paletteName: "Name already used ...",
                });
                return;
              }
              const newPalette: IPalette = {
                id: values.paletteName.trim().replace(/\s/g, "-"),
                paletteName: values.paletteName,
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
            }}
          >
            {({ values, handleChange, handleSubmit, errors }) => (
              <form onSubmit={handleSubmit}>
                <input
                  name="paletteName"
                  value={values.paletteName}
                  onChange={handleChange}
                />
                <span> {errors.paletteName}</span>
                <Button variant="contained" color="primary" type="submit">
                  Save Palette
                </Button>
              </form>
            )}
          </Formik>

          <Link to="/">
            <Button variant="contained" color="secondary">
              Go BACK
            </Button>
          </Link>
        </div>
      </AppBar>
    </div>
  );
};

export default withRouter(PaletteFormNav);
