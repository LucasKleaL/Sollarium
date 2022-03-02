import { React, useState, useEffect, useLayoutEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Button, Container, Typography, Modal, TextField, Box, Grid, RadioGroup, Radio, FormControlLabel, } from "@material-ui/core";

import HeaderButton from "../components/HeaderButton";
import Kamila from "./../public/img/integrantes/kamila_512.png";
import Lucas from "./../public/img/integrantes/lucas_512.png";
import Sabrina from "./../public/img/integrantes/sabrina_512.png";
import Sollarium from "./../public/sollarium_logo_escrita.png";

function About() {

    const BodyTitleStyle = {
        color: "var(--white)",
        fontSize: "3rem",
        fontWeight: "bold",
        marginTop: "2rem",
        textAlign: "left",
    }

    const BodyH2TitleStyle = {
        color: "var(--white)",
        fontSize: "1.8rem",
        fontWeight: "bold",
        marginTop: "1rem",
        marginLeft: "3rem",
        textAlign: "left",
    }

    const BodyTextStyle = {
        color: "var(--white)",
        fontSize: "1.3rem",
        fontWeight: "initial",
        marginTop: "0.5rem",
        marginLeft: "0.2rem",
        textAlign: "justify",
    }

    const BodyH2TextStyle = {
        color: "var(--white)",
        fontSize: "1.3rem",
        fontWeight: "initial",
        marginTop: "0.5rem",
        marginLeft: "3rem",
        textAlign: "justify",
    }

    const BodyLinkSytle = {
        color: "white", 
        fontSize: "1.3rem", 
        cursor: "pointer"
    }

    const IntegranteTitleStyle = {
        color: "var(--white)",
        fontSize: "1.2rem",
        fontWeight: "bold",
        marginTop: "0.5rem",
        textAlign: "center",
        width: "100%"
    }

    const IntegranteDescStyle = {
        color: "var(--white)",
        fontSize: "0.8rem",
        fontWeight: "initial",
        marginTop: "0.5rem",
        textAlign: "center",
        width: "100%"
    }
    
    return (
        <div>

            <header>

                <Link to="/">
                    <img src={Sollarium} className="sollarium-logo" style={{"cursor": "pointer"}} />
                </Link> 

                <div style={{"float": "right", "marginTop": "1.5rem"}}>
                    <HeaderButton text=" Home" url="/" icon="backarrow" />
                </div>

            </header>

            <div>
                <Container maxWidth="lg" align="center" >

                    <div id="about">

                        <Typography style={BodyTitleStyle} >Sollarium</Typography>

                        <Typography style={BodyTextStyle}>
                            Nosso projeto iniciou como uma proposta para a Olimpíada Brasileira de Satélites (OBSAT), primeiramente como uma ideia de missão
                            a ser realizada por um Cubesat 1U. Desta forma, planejamos objetivos baseados em um problema que pode ser potencialmente resolvido 
                            com uma aplicação desenvolvida em um satélite. <br />
                        </Typography>

                        <Typography style={BodyH2TitleStyle}>Missão principal</Typography>

                        <Typography style={BodyH2TextStyle}>
                            No momento, nossa missão principal é monitorar e estudar o comportamento e as implicações da Anomalia Magnética do Atlântico Sul (AMAS)
                            sobre o território brasileiro, utilizando dados de sensores magnetômetros para medir a intensidade do campo magnético local durante
                            um logo período do tempo, processando a informações obtidas procurando padrões e variabilidade da intensidade magnética medida. 
                        </Typography>

                        <Typography style={BodyH2TitleStyle}>Missões secundárias</Typography>

                        <Typography style={BodyH2TextStyle}>
                            Para cumprir nossa missão principal, será necessário que o satélite opere em uma órbita terrestre baixa, mas para avançar de fase na 
                            OBSAT, atualmente está previsto que nosso aparelho faça um voo estratosférico em um balão meteorológico. Desta forma, pretendemos
                            Além dos dados magnéticos que iremos coletar para atingir nosso objetivo principal, vamos também utilizar outros sensores
                            como forma de missões secundárias, visando principalmente a análise da composição e comportamento da alta atmosfera terrestre, 
                            com a máxima altitude esperada de sendo em torno de 30km.
                        </Typography>

                        <Typography style={BodyH2TitleStyle}>Cubesat Sollarium</Typography>

                        <Typography style={BodyH2TextStyle}>
                            O hardware do nosso Cubesat, foi fornecido pela organização da OBSAT quando fomos aprovados na primeira fase, na qual documentamos
                            nossa ideia para uma missão espacial envolvendo um satélite. O kit fornecido foi fabricado 
                            pela <a href="https://www.pionlabs.com.br/" style={BodyLinkSytle}>PION</a>, no qual recebemos um Cubesat 1U com um software embarcado
                            que disponibiliza uma conexão wifi com o satélite e uma página web onde podemos controlá-lo e visualizar os dados que estão sendo captados
                            pelos sensores. <br />
                            A partir dessa base, vamos desenvolver um software próprio para cumprir os requisitos do edital da segunda fase, onde nosso satélite
                            deverá captar os dados de telemetria e payload e enviá-los para a sonda do balão estratosférico via requisição HTTP, enviando um arquivo JSON com até 90 bytes
                            em intervalos de 4 minutos.
                        </Typography>

                    </div>

                    <div id="aboutEquipe">

                        <Typography style={BodyTitleStyle} >Equipe Sollarium</Typography>

                        <Typography style={BodyTextStyle}>
                            Nossa equipe se formou logo quando a OBSAT foi divulgada, nos encontramos no Discord oficial da competição, assim formando
                            o projeto Sollarium e participando da Olimpíada como uma equipe da categoria N2. Nossa equipe é interestadual, sendo o Tutor do 
                            Paraná e as integrantes do Espírito Santo. Dentro da competição, conforme as regras, concorremos no estado do Paraná.
                        </Typography>

                        <Container maxwidth="lg" align="center" style={{width: "100%", marginTop: "1rem"}}>

                            <Grid container spacing={2} style={{ "width": "95%", "marginLeft": "2.5%", "marginRight": "2.5%" }}>

                                <Grid item >
                                    <div style={{width: "33%", height: "33%"}}>
                                        <img src={Lucas} style={{width: "20rem"}} alt="Lucas Kusman Leal" title="Lucas Kusman Leal" />
                                        <div style={{width: "20rem"}}>
                                            <Typography style={IntegranteTitleStyle}>Lucas Kusman Leal - 19 anos</Typography>
                                            <Typography style={IntegranteDescStyle}>Estudante de Bacharelado em Sistemas de Informação</Typography>
                                            <Typography style={{...IntegranteDescStyle,... {fontWeight: "bold", fontSize: "1rem"}}}>Tutor da equipe</Typography>
                                        </div>
                                    </div>
                                </Grid>

                                <Grid item >
                                    <div style={{width: "33%", height: "33%"}}>
                                        <img src={Kamila} style={{width: "20rem"}} alt="Kamila Marinho" title="Kamila Marinho" />
                                        <div style={{width: "20rem"}}>
                                            <Typography style={IntegranteTitleStyle}>Kamlia Marinho - 17 anos</Typography>
                                            <Typography style={IntegranteDescStyle}>Estudante do 3º ano Ensino Médio</Typography>
                                            <Typography style={{...IntegranteDescStyle,... {fontWeight: "bold", fontSize: "1rem"}}}>Integrante da equipe</Typography>
                                        </div>
                                    </div>
                                </Grid>

                                <Grid item >
                                    <div style={{width: "33%", height: "33%"}}>
                                        <img src={Sabrina} style={{width: "20rem"}} alt="Sabrina Torres Antônio" title="Sabrina Torres Antônio" />
                                        <div style={{width: "20rem"}}>
                                            <Typography style={IntegranteTitleStyle}>Sabrina Torres Antônio - 18 anos</Typography>
                                            <Typography style={IntegranteDescStyle}>Estudante do 3º ano Ensino Médio</Typography>
                                            <Typography style={{...IntegranteDescStyle,... {fontWeight: "bold", fontSize: "1rem"}}}>Integrante da equipe</Typography>
                                        </div>
                                    </div>
                                </Grid>

                            </Grid>

                        </Container>

                    </div>

                    <div id="aboutCubesat">

                        <Typography style={BodyTitleStyle} >O que é um Cubesat?</Typography>

                        <Typography style={BodyTextStyle}>
                            Cubesat é um pequeno satélite construído dentro de suas especificações padronizadas, que são de um cubo de 10cm em cada aresta para formar 1U
                            (uma unidade), com cada uma tendo um limite de peso de até 1,33kg. Para projetos maiores, as unidades podem ser combinadas formando
                            um único satélite, com a denominação acompanhando a quantia de unidades, geralmente entre o valor de 2U até 12U. <br />
                            Os primeiros cubesats foram desenvolvidos em 1999 a partir de esforços da Universidade Politécnica Estadual da Califórnia e da 
                            Universidade Stanford para criar uma forma barata de treinar seus alunos em um projeto aeroespacial real. <br />
                            Desde então os cubesats deixaram de ser utilizados apenas para fins acadêmicos e passaram a ser utilizados por agências espaciais,
                            empresas e radioamadores para as mais diversas aplicações, como imageamento terrestre, transmissão de rádio, pesquisas científicas, 
                            entre outras.
                        </Typography>

                    </div>

                </Container>
            </div>

        </div>
    );

}

export default About;