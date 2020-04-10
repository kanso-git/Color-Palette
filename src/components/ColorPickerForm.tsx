import { Formik } from "formik";
import * as yup from "yup";
import { ChromePicker, ColorResult } from "react-color";
import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { NewColorProps } from "./NewPaletteForm";

import { makeStyles } from "@material-ui/styles";
import MaterialField from "./fomik/useMaterialInput";

const useStyles = makeStyles({
  colorNameInput: {
    width: "100%",
    height: "70px",
  },
  addColor: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem",
    fontSize: "2rem",
  },
});

const ColorPickerForm = (props: any) => {
  const { colors, setColors, isPaletteFull } = props;
  const colorValidationSchema = yup.object().shape({
    colorName: yup.string().min(3).required("this field is required"),
  });
  const [color, setColor] = useState<string>("yellow");
  const handleColorChangeComplete = (color: ColorResult) => {
    setColor(color.hex);
  };
  const classes = useStyles();
  const st = {
    default: {
      picker: {
        width: "100% !important",
        marginTop: "2rem",
      },
    },
  };
  return (
    <div>
      <ChromePicker
        color={color}
        onChangeComplete={handleColorChangeComplete}
        styles={st}
      />

      <Formik
        validationSchema={colorValidationSchema}
        initialValues={{ colorName: "" }}
        validate={(values) => {
          const errors: Record<string, string> = {};
          const findColor = colors.find(
            (c: NewColorProps) => c.color === color
          );
          if (findColor) {
            errors.colorName = "RGB Color already used";
          }

          const findColorName = colors.find(
            (c: NewColorProps) =>
              c.name.toLowerCase() === values.colorName.toLowerCase()
          );

          if (findColorName) {
            errors.colorName = "Color Name Already Taken";
          }

          return errors;
        }}
        onSubmit={(values, actions) => {
          const newColor = {
            color,
            name: values.colorName,
          };
          // color unique
          const findColor = colors.find(
            (c: NewColorProps) => c.color === color
          );
          if (findColor) {
            actions.setErrors({
              colorName: "RGB Color already used",
            });
            return;
          }
          const findColorName = colors.find(
            (c: NewColorProps) =>
              c.name.toLowerCase() === values.colorName.toLowerCase()
          );

          if (findColorName) {
            actions.setErrors({
              colorName: "Color Name Already Taken",
            });
            return;
          }

          setColors(colors.concat(newColor));
          actions.resetForm();
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          errors,
          values,
          isValid,
        }) => (
          <form onSubmit={handleSubmit}>
            <MaterialField
              name="colorName"
              label="Choose your color"
              placeHolder="e.g. Red"
              className={classes.colorNameInput}
            />

            <Button
              className={classes.addColor}
              variant="contained"
              disabled={isPaletteFull || !isValid}
              color="primary"
              type="submit"
              style={{
                backgroundColor: isPaletteFull ? "grey" : color,
              }}
            >
              {isPaletteFull ? "Palette Full" : "Add Color"}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ColorPickerForm;
