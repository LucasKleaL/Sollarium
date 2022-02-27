import { React, useState, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";

import Firebase from "../Firebase";
import Papa from "papaparse";

import { Container } from "@material-ui/core";

import LineChart from "../components/LineChart";
import HeaderButton from "./../components/HeaderButton";
import Sollarium from "./../public/sollarium_logo_escrita.png";

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

    return (
        <div style={{"width": "100%"}}>

            <header>

                <Link to="/">
                    <img src={Sollarium} className="sollarium-logo" style={{"cursor": "pointer"}} />
                </Link>

                <div style={{"float": "right", "marginTop": "1.5rem"}}>
                    <HeaderButton text=" Data" url="/data" icon="backarrow" />
                </div>

            </header>

            <Container maxwidth="lg" align="center" style={{"height": "100vh"}}>

                <LineChart data={data} dataUid={dataUid} dataInfos={dataInfos} />

            </Container>

        </div>
    )

}

export default DataViewer;