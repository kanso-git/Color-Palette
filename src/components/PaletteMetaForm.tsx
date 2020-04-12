import "emoji-mart/css/emoji-mart.css";
import React, { useContext, useEffect } from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Picker, EmojiData } from "emoji-mart";
import {
  ColorPaletteContext,
  DispatchContext,
} from "../context/colorPalette.context";
import { Formik } from "formik";
import * as yup from "yup";
import { IPalette, EActionType } from "../actions";
import MaterialField from "./fomik/useMaterialInput";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  paletteNameInput: {
    width: "100%",
    height: "70px",
  },
});

const PaletteMetaForm = (props: any) => {
  const classes = useStyles();
  const { colors, dialogOpened, handleClose } = props;
  const [open, setOpen] = React.useState(false);
  const [stage, setStage] = React.useState<"one" | "tow">("one");
  const schemaPaletteNameValidation = yup.object().shape({
    paletteName: yup.string().min(3).required("Name is required"),
  });
  const palettes = useContext(ColorPaletteContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    setStage("one");
    setOpen(dialogOpened);
  }, [dialogOpened]);
  return (
    <Formik
      initialValues={{ paletteName: "", emoji: "" }}
      validationSchema={schemaPaletteNameValidation}
      validate={(values) => {
        const errors: Record<string, string> = {};
        const findPaletteName = palettes.find(
          (p) =>
            p.paletteName.toLowerCase() === values.paletteName.toLowerCase()
        );
        if (findPaletteName) {
          errors.paletteName = "Name already used ...";
        }
        return errors;
      }}
      onSubmit={(values, actions) => {
        const findPaletteName = palettes.find(
          (p) =>
            p.paletteName.toLowerCase() === values.paletteName.toLowerCase()
        );
        if (findPaletteName) {
          actions.setErrors({
            paletteName: "Name already used ...",
          });
          return;
        } else {
          const newPalette: IPalette = {
            id: values.paletteName.trim().replace(/\s/g, "-"),
            paletteName: values.paletteName,
            emoji: values.emoji,
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
        }
      }}
    >
      {({ values, handleChange, handleSubmit, errors }) => (
        <form onSubmit={handleSubmit}>
          <Dialog
            open={open && stage === "tow"}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Pick an Emoji</DialogTitle>
            <DialogContent>
              <Picker
                i18n={{
                  search: "Recherche",
                  categories: {
                    search: "Résultats de recherche",
                    recent: "Récents",
                  },
                }}
                onSelect={(e: any) => {
                  values.emoji = e.native;
                  handleSubmit();
                }}
              />
            </DialogContent>
          </Dialog>
          <Dialog
            open={open && stage === "one"}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              Choose a Palette Name
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter a name for your new beautiful palette. Make sure
                it's unique!
              </DialogContentText>

              <MaterialField
                name="paletteName"
                label="Palette Name"
                placeHolder="e.g. Material UI"
                className={classes.paletteNameInput}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setStage("tow")}
              >
                Next
              </Button>
            </DialogActions>
          </Dialog>
        </form>
      )}
    </Formik>
  );
};

export default withRouter(PaletteMetaForm);
