import React, { useContext, useEffect } from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
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
  const schemaPaletteNameValidation = yup.object().shape({
    paletteName: yup.string().min(3).required("Name is required"),
  });
  const palettes = useContext(ColorPaletteContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    setOpen(dialogOpened);
  }, [dialogOpened]);
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>

        <Formik
          initialValues={{ paletteName: "" }}
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
            }
          }}
        >
          {({ values, handleChange, handleSubmit, errors }) => (
            <form onSubmit={handleSubmit}>
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
                <Button variant="contained" color="primary" type="submit">
                  Save Palette
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default withRouter(PaletteMetaForm);
