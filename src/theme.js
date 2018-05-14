//@flow
import { createMuiTheme } from "@material-ui/core/styles";

// use theme same breakpoints for both themes
const breakpoints = {
  values: {
    lg: 1280,
    md: 960,
    sm: 600,
    xl: 1920,
    xs: 0
  }
};

/* both themes shares the same contrastText */
export const contrastText = "#ffffff";

/* created using https://material.io/color/
 * then tweaked to provide enough contrast ratio for text
 */
const palette1 = {
  main: "#ff5722",
  light: "#feb997",
  dark: "#d84012",
  contrastText
};

const palette2 = {
  main: "#b71c1c",
  light: "#f05545",
  dark: "#7f0000",
  contrastText
};

export const light = createMuiTheme({
  palette: {
    primary: palette1,
    secondary: palette2,
    type: "light"
  },
  breakpoints
});

export const dark = createMuiTheme({
  palette: {
    primary: palette2,
    secondary: {
      main: palette1.light,
      light: "#f2bfba",
      dark: palette1.dark
    },
    type: "dark"
  },
  breakpoints
});

/* properties shared between themes
 * we export them to avoid unnecessary class changes that occur 
 * when we switch between themes, if withStyles((theme) =>{}) is used
 */
export const shadows = light.shadows;

export const xsDown = light.breakpoints.down("xs");

export const smUp = light.breakpoints.up("sm");
