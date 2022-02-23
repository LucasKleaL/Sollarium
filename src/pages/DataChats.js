import { React, useState, useEffect, useLayoutEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import Firebase from "../Firebase";

import Papa from "papaparse";

import { Button, Container, Typography, Modal, TextField, Box, Grid, RadioGroup, Radio, FormControlLabel, ThemeProvider, } from "@material-ui/core";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import LineChart from "./../components/LineChart";

import Sollarium from "./../public/sollarium_logo_escrita.png";

import WhiteButton from "../themes/WhiteButtonTheme";

function DataViewer() {

    const [data, setData] = useState([]);
    const [dataUrl, setDataUrl] = useState();
    const [dataUid, setDataUid] = useState();
    const [dataInfos, setDataInfos] = useState([]);

    useEffect(() => {
        //
    }, [])

    useLayoutEffect(() => {

        let locationUid = sessionStorage.getItem("dataUid");

        let rawUid;
        let uid;

        if (locationUid) {
            rawUid = locationUid + ".csv";
            uid = locationUid;
            setDataUid(locationUid);
            sessionStorage.setItem("dataUid", locationUid);
        }
        else {
            rawUid = sessionStorage.getItem("dataUid") + ".csv";
            uid = sessionStorage.getItem("dataUid");
            setDataUid(sessionStorage.getItem("dataUid"));
        }

        getRawDataFromFirebase(rawUid);
        getDataInfo(uid);

    }, [])

    async function getRawDataFromFirebase(rawUid) {
        await Firebase.storage().ref("rawdata").child(rawUid).getDownloadURL()
        .then((url) => {
            setDataUrl(url);
            parseCsvToJson(url);
        });
    }

    async function getDataInfo(uid) {
        await Firebase.firestore().collection("rawdata").doc(uid).get()
        .then((snapshot) => {
            setDataInfos(snapshot.data());
            console.log("getDataInfo: "+snapshot.data())
        });
    }

    async function parseCsvToJson(url) {

        let file = await fetch(url, {
            headers: {
                "Origin": "https://sollarium.vercel.app/"
            }
        }).then(e => e.blob());
        
            Papa.parse(file, {
                complete: results => (setData(results.data))
            })
        
    }

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

    return (
        <div style={{"width": "100%"}}>

            <header>

                <Link to="/">
                    <img src={Sollarium} className="sollarium-logo" style={{"cursor": "pointer"}} />
                </Link>

                <div style={{"float": "right", "marginTop": "1.5rem"}}>
                    <Link to="/data" style={{"color": "var(--white)", "textDecoration": "none"}}>
                        <ThemeProvider theme={WhiteButton}>
                            <Button color="primary" variant="outlined" style={HeaderButton}><ArrowBackIcon /> Data</Button>
                        </ThemeProvider>
                    </Link>
                </div>

            </header>

            <Container maxwidth="lg" align="center">

                <LineChart data={data} dataUid={dataUid} dataInfos={dataInfos} />

            </Container>

        </div>
    )



}

export default DataViewer;