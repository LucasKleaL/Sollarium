import { React, useState, useEffect, useLayoutEffect, componentDidMount } from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import Firebase from "../Firebase";
import saveAs from "file-saver";

import Papa from "papaparse";
import { useTable } from "react-table";

import { Button, Container, Typography, Modal, TextField, Box, Grid, RadioGroup, Radio, FormControlLabel, } from "@material-ui/core";
import LogoutIcon from '@mui/icons-material/Logout';
import { render } from "react-dom";

import DataTable from "./../components/DataTable";

function DataViewer() {

    const [data, setData] = useState([]);
    const [dataUrl, setDataUrl] = useState();
    const { dataUid } = useLocation();
    const uid = dataUid + ".csv";

    useEffect(() => {
        //
    }, [])

    useLayoutEffect(() => {
        getDataFromFirebase();
    }, [])

    async function getDataFromFirebase() {
        await Firebase.storage().ref("rawdata").child(uid).getDownloadURL()
        .then((url) => {
            setDataUrl(url);
            parseCsvToJson(url);
        });
    }

    async function parseCsvToJson(url) {

        let file = await fetch(url, {
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "text/csv",
                "Origin": "https://sollarium.vercel.app/"
            }
        }).then(e => e.blob());
        
            Papa.parse(file, {
                complete: results => (setData(results.data))
            })
        
    }

    return (
        <div style={{marginTop: "1rem", marginRight: "2rem", marginLeft: "2rem"}}>
            <Container maxwidth="lg" align="center">
                <DataTable data={data} />
            </Container>
        </div>
    )



}

export default DataViewer;