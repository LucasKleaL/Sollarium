import { React, Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { ThemeProvider }  from "@material-ui/core/styles";
import ArrowBackIcon  from '@mui/icons-material/ArrowBack';
import WhiteButtonTheme from "../themes/WhiteButtonTheme";

class HeaderButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const HeaderButtonStyle = {
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

        const text = this.props.text;
        const url = this.props.url;
        const icon = this.props.icon;
        let content;

        if (icon === "backarrow") {
            content = <ArrowBackIcon />;
        }
        
        return (
            <div>
                <ThemeProvider theme={WhiteButtonTheme}>
                    <Link to={url} style={{"color": "var(--white)", "textDecoration": "none", "cursor": "pointer"}}>
                        <Button style={HeaderButtonStyle} color="primary" variant="outlined">{content} {text}</Button>
                    </Link>
                </ThemeProvider>
            </div>
        )

    }
    
}

export default HeaderButton;