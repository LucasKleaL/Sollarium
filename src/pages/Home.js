import { React, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Firebase from "./../Firebase";

import { Button, Container, Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import { ArrowDownwardIcon } from '@mui/icons-material/ArrowDownward';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

import WhiteButton from "../themes/WhiteButtonTheme";

import Sollarium from "./../public/sollarium_logo_escrita.png";
import CubesatSollarium from "./../public/img/cubesat_sollarium_1_transparente_512_small.png";
import "./../styles/home.css";

function Home() {

    var history = useHistory();

    const [hover, setHover] = useState(false);

    const HeaderButton = {
        height: "3rem",
        width: "8rem",
        marginRight: "0.5rem",
        fontSize: "2rem",
        textTransform: "capitalize",
        borderRadius: "10px",
        border: "0",
        fontWeight: "900"
    }

    const LandingPageTitle = {
        fontSize: "2rem",
        fontWeight: "900",
        color: "var(--white)",
        textAlign: "center"
    }

    const LandingPageSubtitle = {
        fontSize: "1.2rem",
        fontWeight: "600",
        color: "var(--white)",
        marginTop: "0.2rem",
        textAlign: "center"
    }

    const RoundedDropDownButton = {
        color: "var(--white)",
        fontSize: "4rem",
        marginTop: "1rem",
        cursor: "pointer",
        
    }

    return (

        <div>

            <div class="header-wallpaper">

                <header>
                    
                    <img src={Sollarium} className="sollarium-logo" />
                    
                    <div style={{"float": "right", "marginTop": "1.5rem"}}>

                        <ThemeProvider theme={WhiteButton}>
                            <Button color="primary" variant="outlined" style={HeaderButton}>About</Button>
                        </ThemeProvider>

                        <Link to="/data" style={{"textDecoration": "none"}}>
                            <ThemeProvider theme={WhiteButton}>
                                <Button color="primary" variant="outlined" style={HeaderButton}>Data</Button>
                            </ThemeProvider>
                        </Link>
                        
                    </div>

                    <Container align="center">

                        <Container align="center">
                            <img src={CubesatSollarium} className="cubesat-header-img"/>
                        </Container>
                            
                        <Typography variant="h2" style={LandingPageTitle}>CONHEÇA NOSSO CUBESAT</Typography>
                        <Typography variant="h2" style={LandingPageSubtitle}>Um projeto 100% brasileiro feito por estudantes</Typography>

                        <ArrowDropDownCircleIcon style={RoundedDropDownButton}/>

                    </Container>
       
                </header>

            </div>

            <div class="div-section-1">

                    <Container maxwidth="lg" align="center">
                        <img src={CubesatSollarium} className="cubesat-header-img"/>
                    </Container>

            </div>

        </div>

    )

}

export default Home