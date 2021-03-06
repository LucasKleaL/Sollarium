import { React, useState } from "react";
//import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import { Button, Container, Typography, Grid } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

//import { ArrowDownwardIcon } from '@mui/icons-material/ArrowDownward';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import InstagramIcon from '@mui/icons-material/Instagram';

import AcelerometerIcon from "./../public/icons/acelerometer_icon.png";
import Co2Icon from "./../public/icons/co2_icon.png";
import CommunicationIcon from "./../public/icons/communication_icon.png";
import CpuIcon from "./../public/icons/cpu_icon.png";
import EnergyIcon from "./../public/icons/energy_icon.png";
import GiroscopeIcon from "./../public/icons/giroscope_icon.png";
import HumidityIcon from "./../public/icons/humidity_icon.png";
import LuminositIcon from "./../public/icons/luminosit_icon.png";
import MagnetometerIcon from "./../public/icons/magnetometer_icon.png";
import PressureIcon from "./../public/icons/pressure_icon.png";
import TemperatureIcon from "./../public/icons/temperature_icon.png";

import WhiteButton from "../themes/WhiteButtonTheme";

import Sollarium from "./../public/sollarium_logo_escrita.png";
import CubesatSollarium from "./../public/img/cubesat_sollarium_1_transparente_512_small.png";
import ObsatLogo from "./../public/img/obsat_logo.png";
import SollariumLogo from "./../public/img/sollarium_logo_512.png";
import VercelLogo from "./../public/img/vercel_logo.png";
import FirebaseLogo from "./../public/img/firebase_logo.png";
import "./../styles/home.css";

function Home() {

    //var history = useHistory();

    const systemTitles = [
        "SENSOR DE PRESSÃO",
        "SENSOR DE CO2",
        "SENSOR DE TEMPERATURA",
        "SENSOR DE UMIDADE",
        "MAGNETÔMETRO",
        "COMPUTADOR DE BORDO",
        "SISTEMA DE COMUNICAÇÃO",
        "SISTEMA DE ENERGIA",
        "SENSOR DE LUMINOSIDADE",
        "GIROSCÓPIO",
        "ACELERÔMETRO"
    ]

    const systemDescriptions = [
        "O sensor de pressão mede a pressão atmósferica local, muito útil para se situar na atmosfera terreste e analisar o comportamento dos gases no local.",
        "O sensor de CO2, mede a quantidade de dióxido de carbono que está interagindo com o sensor. O monitoramento deste gás é crucial para realizar análises da atmosfera local e monitoramento de poluição.",
        "O sensor de temperatura mede a temperatura ambiente ao redor. Este sensor é o mesmo que faz medições de umidade, um DHT11.",
        "O sensor de umidade mede a quantidade de umidade no ar em porcentagem. Este sensor é o mesmo que faz as medições de temperatura, um DHT11.",
        "O magnetômetro é o sensor crucial para nossa missão principal. Com ele é possível fazer medições sobre a influência do campo magnético que está interagindo com o sensor.",
        "O computador embarcado, é a unidade responsável por controlar todos os outros subsistemas do satélite. É com ele que gerenciamos as interações entre o software e hardware do sistema. Nosso computador de bordo é composto por um ESP32 embutido em uma placa feita pela PION Labs.",
        "O subsistema de comunicação envolve o hardware e software responsável por transmitir as informações obtidas a partir dos sensores. Para esta fase da missão iremos utilizar requisições HTTP via wifi transmitindo os dados e telemetria formatados em JSON.",
        "O subsistema de energia é reponsável por gerenciar, gerar, e distribuir a energia para todos os demais subsistemas do satélite. No momento utilizamos uma pequena bateria de 400mah que acompanha o cubesat e é carregada via USB. Para uma missão real pretendemos aumentar a capacidade energética e utilizar paineis fotovoltaicos para obtenção de energia.",
        "O sensor de luminosidade é essencial para a orientação do cubesat no espaço, com ele conseguimos obter a direção em que os raios solares estão atingindo o cubesat, podendo ser utilizado para guiar a captação de energia dos paineis solares. Além do mais, com ele é possível realizar experimentos envolvendo luz UV.",
        "O giroscópio é o sensor responsável de coletar dados sobre a movimentação do cubesat, com ele é possível obter dados da rotação nos eixos X, Y e Z. Os dados deste sensor são essencias para a telemetria e controle de atitude.",
        "O acelerômetro, assim como o giroscópio, capta dados sobre o movimento nos eixos X, Y e Z. Porém o acelerômetro é especializado em captar medidas do quanto o cubesat está sendo impulsionado em determinada direção."
    ]

    const [actualSystemTitle, setActualSystemTitle] = useState(systemTitles[5]);
    const [actualSystemDesc, setActualSystemDesc] = useState(systemDescriptions[5]);

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

    const SystemTitleStyle = {
        color: "var(--white)",
        fontSize: "2rem",
        fontWeight: "bold",
        marginTop: "0.5rem"
    }

    const SystemDescStyle = {
        color: "var(--white)",
        fontSize: "1.2rem",
        fontWeight: "initial",
        width: "50%",
        textAlign: "justify",
        marginTop: "0.2rem"
    }

    const FooterTextStyle = {
        color: "var(--gray-tag)",
        fontSize: "1.5rem",
        fontWeight: "bold",
        marginTop: "2rem",
        marginLeft: "2rem"
    }

    const FooterLinkStyle = {
        color: "var(--gray-tag)",
        fontSize: "1rem",
        fontWeight: "bold",
        marginTop: "0.5rem",
        marginLeft: "2rem",
        textDecoration: "underline",
        cursor: "pointer"
    }

    const FooterIcon = {
        color: "var(--gray-tag)",
        fontSize: "3rem",
        marginLeft: "2rem",
        marginTop: "0.2rem",
        cursor: "pointer"
    }

    const BodyTitleStyle = {
        color: "var(--white)",
        fontSize: "3rem",
        fontWeight: "bold",
        marginTop: "2rem",
        textAlign: "left",
    }

    const BodyTextStyle = {
        color: "var(--white)",
        fontSize: "1.5rem",
        fontWeight: "initial",
        marginTop: "0.5rem",
        textAlign: "left",
    }

    const BodyLinkSytle = {
        color: "white", 
        fontSize: "1.5rem", 
        cursor: "pointer"
    }

    const BodyImgStyle = {
        width: "15rem",
    }

    return (

        <div>

            <div class="header-wallpaper">

                <header>
                    
                    <img src={Sollarium} className="sollarium-logo" alt="Sollarium logo" />
                    
                    <div style={{"float": "right", "marginTop": "1.5rem"}}>

                        <Link to="/about" style={{"textDecoration": "none"}}>
                            <ThemeProvider theme={WhiteButton}>
                                <Button color="primary" variant="outlined" style={HeaderButton}>About</Button>
                            </ThemeProvider>
                        </Link>

                        <Link to="/data" style={{"textDecoration": "none"}}>
                            <ThemeProvider theme={WhiteButton}>
                                <Button color="primary" variant="outlined" style={HeaderButton}>Data</Button>
                            </ThemeProvider>
                        </Link>
                        
                    </div>

                    <Container maxwidth="lg" align="center" >

                        <img src={CubesatSollarium} className="cubesat-header-img" alt="Cubesat Sollarium" />
                        
                        <Typography variant="h2" style={LandingPageTitle}>CONHEÇA NOSSO CUBESAT</Typography>
                        <Typography variant="h2" style={LandingPageSubtitle}>Um projeto 100% brasileiro feito por estudantes</Typography>

                        <ArrowDropDownCircleIcon style={RoundedDropDownButton}/>

                    </Container>
       
                </header>

            </div>

            <div class="div-section-1">

                <Container maxwidth="lg" align="center">

                    <img src={CubesatSollarium} className="cubesat-header-img" style={{ "width": "30rem" }} alt="Cubesat Sollarium" />

                    <Grid container spacing={3} style={{ "width": "95%", "marginLeft": "2.5%", "marginRight": "2.5%" }}>

                        <Grid item><img className="cubesat-system-icon" src={PressureIcon} onMouseEnter={() => { setActualSystemTitle(systemTitles[0]); setActualSystemDesc(systemDescriptions[0]) }} alt="Pressure Icon" /></Grid>
                        <Grid item><img className="cubesat-system-icon" src={Co2Icon} onMouseEnter={() => { setActualSystemTitle(systemTitles[1]); setActualSystemDesc(systemDescriptions[1]) }} alt="CO2 Icon" /></Grid>
                        <Grid item><img className="cubesat-system-icon" src={TemperatureIcon} onMouseEnter={() => { setActualSystemTitle(systemTitles[2]); setActualSystemDesc(systemDescriptions[2]) }} alt="Temperature Icon" /></Grid>
                        <Grid item><img className="cubesat-system-icon" src={HumidityIcon} onMouseEnter={() => { setActualSystemTitle(systemTitles[3]); setActualSystemDesc(systemDescriptions[3]) }} alt="Humidity Icon" /></Grid>
                        <Grid item><img className="cubesat-system-icon" src={MagnetometerIcon} onMouseEnter={() => { setActualSystemTitle(systemTitles[4]); setActualSystemDesc(systemDescriptions[4]) }} alt="Magnetometer Icon" /></Grid>
                        <Grid item><img className="cubesat-system-icon" src={CpuIcon} onMouseEnter={() => { setActualSystemTitle(systemTitles[5]); setActualSystemDesc(systemDescriptions[5]) }} alt="CPU Icon" /></Grid>
                        <Grid item><img className="cubesat-system-icon" src={CommunicationIcon} onMouseEnter={() => { setActualSystemTitle(systemTitles[6]); setActualSystemDesc(systemDescriptions[6]) }} alt="Communication Icon" /></Grid>
                        <Grid item><img className="cubesat-system-icon" src={EnergyIcon} onMouseEnter={() => { setActualSystemTitle(systemTitles[7]); setActualSystemDesc(systemDescriptions[7]) }} alt="Energy Icon" /></Grid>
                        <Grid item><img className="cubesat-system-icon" src={LuminositIcon} onMouseEnter={() => { setActualSystemTitle(systemTitles[8]); setActualSystemDesc(systemDescriptions[8]) }} alt="Luminosity Icon" /></Grid>
                        <Grid item><img className="cubesat-system-icon" src={GiroscopeIcon} onMouseEnter={() => { setActualSystemTitle(systemTitles[9]); setActualSystemDesc(systemDescriptions[9]) }} alt="Giroscope Icon" /></Grid>
                        <Grid item><img className="cubesat-system-icon" src={AcelerometerIcon} onMouseEnter={() => { setActualSystemTitle(systemTitles[10]); setActualSystemDesc(systemDescriptions[10]) }} alt="Acelerometer Icon" /></Grid>

                    </Grid>

                    <div style={{ "paddingBottom": "2rem" }}>
                        <Typography style={SystemTitleStyle}>{actualSystemTitle}</Typography>
                        <Typography style={SystemDescStyle}>{actualSystemDesc}</Typography>
                    </div>

                </Container>

            </div>

            <div className="div-section-2">

                <Container maxwidth="lg" align="center">

                    <div className="div-body-text">

                        <Typography style={BodyTitleStyle}>Missão principal</Typography>
                        <Typography style={BodyTextStyle}>
                            Nosso principal objetivo é captar, armazenar e processar dados provenientes de sensores magnetômetros
                            com a finalidade de monitorar e estudar o comportamento da magnetosfera terrestre, principalmente sobre a Anomalia Magnética do
                            Atlântico Sul (AMAS). Na página <Link style={BodyLinkSytle} to="/about">about</Link> você encontrará informações mais detalhadas
                            sobre nosso cubesat e suas missões.
                        </Typography>
                        <Typography style={BodyTextStyle}>
                            Esta anomalia ocorre sobre boa parte do território brasileiro, sendo que outros cubesats já foram lançados visando 
                            estudá-la, como é o caso 
                            do <a style={BodyLinkSytle} href="http://www.inpe.br/sul/nanosat/" target="_blank" rel="noreferrer">NanoSatC-BR1</a> que
                            já está a mais de 7 anos operando e transmitindo dados a partir de uma órbita terrestre baixa, 
                            tendo como parte de sua missão principal monitorar a AMAS.
                        </Typography>

                        <Typography style={BodyTitleStyle}>OBSAT</Typography>
                        <Typography style={BodyTextStyle}>
                            Desde seu início o projeto Sollarium foi concebido para a 1ª Olimpíada Brasileira de Satélites (OBSAT).
                            Nossos objetivos são alinhados com o cumprimento das metas estabelecidas nos editais da competição divulgados em cada fase. 
                            Para mais informações sobre a OBSAT acesse 
                            seu <a style={BodyLinkSytle} href="https://obsat.org.br/" target="_blank" rel="noreferrer">website</a>.
                        </Typography>

                        <Typography style={BodyTitleStyle}>Sobre a equipe</Typography>
                        <Typography style={BodyTextStyle}>
                            O projeto Sollarium é formado por três estudantes brasileiros, sendo uma equipe interestadual,
                            com o tutor Lucas residente do Paraná e as integrantes Kamila e Sabrina do Espírito Santo. Saiba mais na 
                            página <Link style={BodyLinkSytle} to="/about">About</Link>.
                        </Typography>

                    </div>

                    <div style={{marginTop: "3rem"}}>
                        <img style={BodyImgStyle} src={ObsatLogo} alt="Logo da OBSAT" title="OBSAT" />
                        <img style={BodyImgStyle} src={SollariumLogo} alt="Logo da Sollarium" title="Sollarium" />    
                    </div>

                </Container>

            </div>

            <footer>

                <Grid container spacing={3} style={{ "width": "95%", "marginLeft": "2.5%", "marginRight": "2.5%", "paddingTop": "0.1rem", "paddingBottom": "1rem" }}>
                    <Grid item>
                        <div style={{"width": "20rem", "height": "80%", "marginTop": "1rem",}}>
                        <Typography style={FooterTextStyle}>2021 Sollarium</Typography>
                        <Typography style={FooterLinkStyle} onClick={() => window.location = "mailto:sollarium.org@gmail.com"}>sollarium.org@gmail.com</Typography>
                        </div>
                    </Grid>
                    <Grid item>
                        <div style={{"borderLeft": "2px solid var(--gray-tag)", "height": "80%", "marginTop": "1rem", "float": "left", "width": "20rem"}}>
                        <Typography style={{...FooterTextStyle,...{"fontSize": "1.2rem"}}}>Acompanhe nossa rede social</Typography>
                        <InstagramIcon style={FooterIcon} onClick={() => window.location.href = "https://www.instagram.com/sollarium.cubesat/"} target="_blank" />
                        </div>
                    </Grid>
                    <Grid item>
                        <div style={{"borderLeft": "2px solid var(--gray-tag)", "height": "80%", "marginTop": "1rem", "float": "left", "width": "20rem"}}>
                        <Typography style={{...FooterTextStyle,...{"fontSize": "1.2rem"}}}>Powered by</Typography>
                        <div style={{marginLeft: "2rem", marginTop: "0.6rem", display: "flex"}}>
                            <a href="https://vercel.com/" target="_blank" rel="noreferrer" style={{cursor: "pointer"}} >
                                <img style={{width: "9rem"}} src={VercelLogo} alt="Vercel" title="Vercel" />
                            </a>
                            <a href="https://firebase.google.com/" target="_blank" rel="noreferrer" style={{cursor: "pointer"}}>
                                <img style={{width: "9rem"}} src={FirebaseLogo} alt="Firebase" title="Firebase" />
                            </a>
                        </div>
                        </div>
                    </Grid>
                </Grid>

            </footer>

        </div>

    )

}

export default Home