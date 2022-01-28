import { createTheme } from "@material-ui/core"; 

const WhiteButtonTheme = createTheme({  
    palette: {
        primary: {
          light: "#FFFFFF",
          main: "#FFFFFF",
          dark: "#FFFFFF",
          getContrastText: "#FFFFFF"
        }
      }
});

export default WhiteButtonTheme;