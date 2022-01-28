import { React, useState, useEffect, useLayoutEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import Firebase from "../Firebase";
import CSVReader from "react-csv-reader";
import csv from "csvtojson";

import { Button, Container, Typography, Modal, TextField, Box, Grid, RadioGroup, Radio, FormControlLabel, } from "@material-ui/core";
import LogoutIcon from '@mui/icons-material/Logout';

function DataViewer() {

    const [data, setData] = useState();
    const { dataUid } = useLocation();
    const uid = dataUid + ".csv";

    useEffect(() => {
        getDataFromFirebase();
        
    }, [])

    useEffect(() => {

        //

    }, [data])

    const parseCSV = () => {

        const result = {
            header: [],
            content: [],
        }

        const [header, ...aux] = data.split('\n');

        result.header = header.split(';');

        aux.forEach((item) => {
            result.data.push(item.split(';'));
        })

        console.log(result)

    }

    async function getDataFromFirebase() {
        await Firebase.storage().ref("rawdata").child(uid).getDownloadURL()
        .then((url) => {
            setData(url[0]);
            console.log(url[0])
        });
    }

    csv()
    .fromFile(data)
    .then((jsonObj) => {
        console.log(jsonObj)
    })

    return (

        <div>
            <CSVReader onFileLoaded={(data)}/>
        </div>

    )

}

export default DataViewer;