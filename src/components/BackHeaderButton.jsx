import { React, Component } from "react";
import { Button } from "@material-ui/core";
import { ArrowBackIcon } from '@mui/icons-material/ArrowBack';
import { ThemeProvider } from "@material-ui/core/styles";
import WhiteButtonTheme from "../themes/WhiteButtonTheme";

class BackHeaderButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const HeaderButton = {
            height: "3rem",
            width: "8rem",
            marginRight: "0.5rem",
            fontSize: "2rem",
            textTransform: "capitalize",
            borderRadius: "10px",
            border: "0",
            fontWeight: "900",
            color: "var(--white)",
        }

        return (
            <div>
                <ThemeProvider theme={WhiteButtonTheme}>
                    <Button style={HeaderButton} color="primary" variant="outlined"><ArrowBackIcon /> {this.props.text}</Button>
                </ThemeProvider>
            </div>
        )

    }
    
}

export default BackHeaderButton;

