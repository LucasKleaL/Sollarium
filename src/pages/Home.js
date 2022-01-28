import { React, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Firebase from "./../Firebase";

import { Button, Container, Typography, Grid } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import { ArrowDownwardIcon } from '@mui/icons-material/ArrowDownward';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

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
import "./../styles/home.css";

function Home() {

    var history = useHistory();

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
        "O sensor de pressão mede a pressão atmósferica local, muito útil para se situar na atmosfera terreste e analisar a composição atmosférica local.",
        "O sensor de CO2, mede a quantidade de dióxido de carbono que está interagindo com o sensor. O monitoramento deste gás é crucial para realizar análises da atmosfera local e monitoramento de poluição.",
        "O sensor de temperatura mede a temperatura ambiente ao redor do sensor. Este sensor é o mesmo que faz medições de umidade, um sensor DHT11.",
        "O sensor de umidade mede a quantidade de umidade no ar que está interagindo com o sensor. Este sensor é o mesmo que faz as medições de temperatura, um sensor DHT11.",
        "O magnetômetro é o sensor crucial para nossa missão principal. Com ele é possível fazer medições sobre a influência do campo magnético que está interagindo com o sensor.",
        "O computador embarcado, é a unidade responsável porcontrolar todos os outros subsistemas do satélite.É com ele que gerenciamos as interações entre o software e hardware do sistema. Nosso computador de bordo é composto por um ESP32embutido em uma placa feita pela PION Labs.",
        "O subsistema de comunicação envolve o hardware e software responsável por transmitir as informações obtidas a partir dos sensores. Ainda não definimos o hardware a ser utilizado para nossa missão, mas provavelmente utilizaremos frequências de rádio UHF para as transmissões de dados e telemetria.",
        "O subsistema de energia é reponsável por gerenciar, gerar, e distribuir a energia para todos os demais subsistemas do satélite. No momento utilizamos uma bateria da PION que acompanha o cubesat e é carregada via USB. Para uma missão real pretendemos aumentar a capacidade energética e utilizar paineis fotovoltaicos para obtenção de energia.",
        "O sensor de luminosidade é essencial para a orientação do cubesat no espaço, com ele conseguimos obter a direção em que os raios solares estão atingindo o cubesat, podendo ser utilizado para guiar a captação de energia dos paineis solares. Além do mais, com ele é possível realizar experimentos envolvendo luz UV.",
        "O giroscópio é o sensor responsável de coletar dados sobre a movimentação do cubesat, com ele é possível obter dados da rotação nos eixos X, Y e Z. Os dados deste sensor são essencias para a telemetria e controle de atitude.",
        "O acelerômetro, assim como o giroscópio, capta dados sobre o movimento nos eixos X, Y e Z. Porém o acelerômetro é especializado em captar medidas de quanto o cubesat está sendo impulsionado em determinada direção."
    ]

    const [hover, setHover] = useState(false);
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

                        <Grid container spacing={3} style={{"width": "95%", "marginLeft": "2.5%", "marginRight": "2.5%"}}>

                            <Grid item><img className="cubesat-system-icon" src={PressureIcon} onMouseEnter={() => {setActualSystemTitle(systemTitles[0]); setActualSystemDesc(systemDescriptions[0])}}/></Grid>
                            <Grid item><img className="cubesat-system-icon" src={Co2Icon} onMouseEnter={() => {setActualSystemTitle(systemTitles[1]); setActualSystemDesc(systemDescriptions[1])}}/></Grid>
                            <Grid item><img className="cubesat-system-icon" src={TemperatureIcon} onMouseEnter={() => {setActualSystemTitle(systemTitles[2]); setActualSystemDesc(systemDescriptions[2])}}/></Grid>
                            <Grid item><img className="cubesat-system-icon" src={HumidityIcon} onMouseEnter={() => {setActualSystemTitle(systemTitles[3]); setActualSystemDesc(systemDescriptions[3])}}/></Grid>
                            <Grid item><img className="cubesat-system-icon" src={MagnetometerIcon} onMouseEnter={() => {setActualSystemTitle(systemTitles[4]); setActualSystemDesc(systemDescriptions[4])}}/></Grid>
                            <Grid item><img className="cubesat-system-icon" src={CpuIcon} onMouseEnter={() => {setActualSystemTitle(systemTitles[5]); setActualSystemDesc(systemDescriptions[5])}}/></Grid>
                            <Grid item><img className="cubesat-system-icon" src={CommunicationIcon} onMouseEnter={() => {setActualSystemTitle(systemTitles[6]); setActualSystemDesc(systemDescriptions[6])}}/></Grid>
                            <Grid item><img className="cubesat-system-icon" src={EnergyIcon} onMouseEnter={() => {setActualSystemTitle(systemTitles[7]); setActualSystemDesc(systemDescriptions[7])}}/></Grid>
                            <Grid item><img className="cubesat-system-icon" src={LuminositIcon} onMouseEnter={() => {setActualSystemTitle(systemTitles[8]); setActualSystemDesc(systemDescriptions[8])}}/></Grid>
                            <Grid item><img className="cubesat-system-icon" src={GiroscopeIcon} onMouseEnter={() => {setActualSystemTitle(systemTitles[9]); setActualSystemDesc(systemDescriptions[9])}}/></Grid>
                            <Grid item><img className="cubesat-system-icon" src={AcelerometerIcon} onMouseEnter={() => {setActualSystemTitle(systemTitles[10]); setActualSystemDesc(systemDescriptions[10])}}/></Grid>

                        </Grid>

                        <div style={{"paddingBottom": "2rem"}}>
                            <Typography style={SystemTitleStyle}>{actualSystemTitle}</Typography>
                            <Typography style={SystemDescStyle}>{actualSystemDesc}</Typography>
                        </div>

                    </Container>

            </div>

        </div>

    )

}

export default Home