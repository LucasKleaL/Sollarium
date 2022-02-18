import { React, useState, useEffect, useLayoutEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Firebase from "./../Firebase";
import crypto from "crypto";
import saveAs from "file-saver";

import { Button, Container, Typography, Modal, TextField, Box, Grid, RadioGroup, Radio, FormControlLabel, } from "@material-ui/core";
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import { ThemeProvider } from "@material-ui/core/styles";

import "./../styles/data.css";

import LoginButtonTheme from "../themes/LoginButtonTheme";
import WhiteButtonTheme from "../themes/WhiteButtonTheme";

function Data() {

    var history = useHistory();

    //login variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //send new raw data variables
    const [dataTitle, setDataTitle] = useState("");
    const [dataDesc, setDataDesc] = useState("");
    const [dataDate, setDataDate] = useState("");
    const [dataTime, setDataTime] = useState("");
    const [dataUser, setDataUser] = useState("");
    const [rawData, setRawData] = useState([]);

    //environment variables
    const [open, setOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [dataViewType, setDataViewType] = useState("rawData");
    const [rawDataFirebase, setRawDataFirebase] = useState([]);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleAddOpen = () => {
        setAddOpen(true);
    }
    const handleAddClose = () => {
        setAddOpen(false);
    }

    useLayoutEffect(() => {
        Firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let uid = user.uid;
                Firebase.firestore().collection("users").doc(uid).get()
                    .then((snapshot) => {
                        //
                    })
            }
            else {
                handleOpen();
            }
        });
    }, []);

    // se o modal de login for fechado e o login não for realizado o modal irá reabrir
    useEffect(() => {
        Firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let uid = user.uid;
                setDataUser(uid);
                Firebase.firestore().collection("users").doc(uid).get()
                    .then(() => {
                        getRawData();
                    })
            }
            else {
                handleOpen();
            }
        });
    }, [open])

    // recupera dados do banco de acordo com a opção marcada
    useEffect(() => {
        if (dataViewType === "rawData") {
            getRawData();
        }
    }, [dataViewType])

    async function getRawData() {
        await Firebase.firestore().collection("rawdata").get()
        .then((snapshot) => {
            let snapshotArray = [];
            snapshot.docs.map((doc) => snapshotArray.push([doc.data(), doc.id]));
            setRawDataFirebase(snapshotArray);
            console.log(snapshotArray);
        })
    }

    function login() {

        let hashPassword = crypto.createHash("sha256").update(password).digest("hex");
        Firebase.auth().signInWithEmailAndPassword(email, hashPassword)
        .then((user) => {
            handleClose();
        })
        .catch((error) => {
            alert("Não foi possível realizar login.")
        })

    }

    function logout() {
        Firebase.auth().signOut();
    }

    async function sendNewRawData() {

        let dataDatetime = dataDate + " " + dataTime;

        await Firebase.firestore().collection("rawdata")
        .add({
            data_title: dataTitle,
            data_description: dataDesc,
            data_datetime: dataDatetime,
            data_user: dataUser
        })
        .then((docRef) => {
            setNewRawDataFile(docRef.id);
        })

    }

    async function setNewRawDataFile(uid) {

        let dataName = uid + ".csv";

        await Firebase.storage().ref("rawdata").child(dataName).put(rawData)
            .then((e) => {
                alert("Data file uploaded with success!")
            })
            .catch((e) => {
                console.log("Error on data file upload.")
         })

    }

    function redirectToDataViewer(uid) {
        history.push({
            pathname: "/dataviewer",
            dataUid: uid
        })
    }

    async function directFileDownload(uid) {
        await Firebase.storage().ref("rawdata").child(uid).getDownloadURL()
        .then((url) => {

            saveAs(
                url,
                uid
            )

        })
        .catch((error) => {
            alert("Error on file download. " + error)
        })
    }

    const ModalBoxStyle = {
        width: "30rem",
        backgroundColor: "var(--white-background)",
        borderRadius: "10px"
    }

    const ModalTextFieldStyle = {
        width: "20rem",
        marginTop: "1rem",
    }

    const LoginButtonStyle = {
        width: "5rem",
        height: "2.5rem",
        marginTop: "1rem",
        textTransform: "capitalize"
    }

    const FiltersSectionStyle = {
        width: "100%",
        height: "3rem",
        marginTop: "1rem"
    }

    const DataContainerStyle = {
        width: "100%",
        overflow: "auto",
        marginTop: "5rem",
        borderRadius: "10px",
        border: "solid",
        borderColor: "white"
    }

    const AddDataButtonStyle = {
        width: "3rem",
        height: "3rem",
        borderRadius: "10px",
        float: "right",
        marginTop: "0.5rem"
    }

    const FormInputTitleStyle = {
        color: "var(--material-blue)",
        fontSize: "0.8rem",
        float: "left",
        marginLeft: "5rem",
        marginTop: "1rem"
    }

    const DataCardStyle = {
        backgroundColor: "var(--white-background)",
        width: "18rem",
        height: "20rem",
        borderRadius: "10px",
        marginLeft: "0.5rem",
        marginTop: "0.5rem"
    }

    const DataCardTitleStyle = {
        fontSize: "1.5rem",
        fontWeigth: "bold",
        textAlign: "left",
        marginLeft: "0.3rem"
    }
    
    const DataCardDescStyle = {
        fontSize: "1rem",
        fontWeigth: "initial",
        textAlign: "left",
        marginLeft: "0.3rem",
        marginTop: "0.2rem"
    }

    const PreviewDataButtonStyle = {
        width: "5rem",
        height: "3rem",
        marginTop: "1rem",
        textTransform: "capitalize",
        fontWeigth: "bold"
    }

    return (

        <div style={{"height": "100%"}}>

            <Modal open={open} onClose={handleClose} style={{"marginTop": "10%"}}>

                <Container align="center" maxwidth="lg" style={{"border": "none"}}>
                    <Box style={ModalBoxStyle}>

                        <div>
                            <TextField label="Email" type="email" placeholder="Insira seu email" style={ModalTextFieldStyle} onChange={ (e) => { setEmail(e.target.value) } } />
                            <TextField label="Senha" type="password" placeholder="Insira sua senha" style={ModalTextFieldStyle} onChange={ (e) => { setPassword(e.target.value) } } />
                        </div>
                        
                        <div>
                            <ThemeProvider theme={LoginButtonTheme}>
                                <Button color="primary" variant="contained" style={LoginButtonStyle} onClick={login} >Login</Button>
                            </ThemeProvider>
                        </div>

                        <div style={{"paddingTop": "1rem", "paddingBottom": "1rem"}}>
                            <Typography >Não possui cadastro? 
                                <Link to="/signup" style={{"textDecoration": "none"}} onClick={handleClose}>
                                    <b className="b-signup">Criar conta</b>
                                </Link>
                            </Typography>
                        </div>

                    </Box>
                </Container>

            </Modal>

            <Modal open={addOpen} onClose={handleAddClose}>

                <Container align="center" maxwidth="lg" style={{"marginTop": "10%"}}>

                    <Box style={ModalBoxStyle}>

                        <div>

                            <TextField label="Data title" type="text" placeholder="The data numeration/title" style={ModalTextFieldStyle} onChange={ (e) => {setDataTitle(e.target.value)} } />
                            <TextField label="Data description" type="text" placeholder="The data description" style={ModalTextFieldStyle} onChange={ (e) => {setDataDesc(e.target.value)} } />

                            <div>
                                <label style={FormInputTitleStyle}>Data acquisition date</label>
                                <TextField type="date" style={{"width": "20rem"}} onChange={ (e) => {setDataDate(e.target.value)} } />
                            </div>
                            
                            <div>
                                <label style={FormInputTitleStyle}>Data acquisition time</label>
                                <TextField type="time" style={{"width": "20rem"}} onChange={ (e) => {setDataTime(e.target.value)} } />
                            </div>

                            <div>
                                <label style={{...FormInputTitleStyle,...{"width": "20rem", "textAlign": "left", "marginBottom": "0.5rem"}}} for="dataFileInput">Data file</label>
                                <input type="file" id="dataFileInput" style={{"width": "20rem", "overflow": "auto"}} onChange={ (e) => {setRawData(e.target.files[0])} } />
                            </div>

                            <div style={{"paddingBottom": "1rem"}}>
                                <ThemeProvider theme={LoginButtonTheme}>
                                    <Button color="primary" variant="contained" style={LoginButtonStyle} onClick={sendNewRawData}>Enviar</Button>
                                </ThemeProvider>
                            </div>
                            
                        </div>

                    </Box>

                </Container>

            </Modal>

            <header>

                <div style={{"float": "right", "marginTop": "1.5rem"}}>
                    <LogoutIcon fontSize="large" style={{"color": "white", "marginRight": "2rem", "cursor": "pointer"}} onClick={logout} />
                </div>  
                
            </header>

            <div>

                <Container align="center" maxwidth="lg" style={DataContainerStyle}>

                    <div style={FiltersSectionStyle}>

                        <RadioGroup defaultValue="rawData" style={{"color": "white", "overflow": "auto", "width": "15rem", "float": "left"}} onChange={(e) => {setDataViewType(e.target.value)}} >
                            <FormControlLabel value="rawData" control={<Radio defaultChecked={true} style={{"color": "white"}}/>} label="Raw data" />
                            <FormControlLabel value="processedData" control={<Radio style={{"color": "white"}}/>} label="Processed data" />
                        </RadioGroup>
                        
                        <div>
                            <ThemeProvider theme={WhiteButtonTheme}>
                                <Button color="primary" variant="outlined" style={AddDataButtonStyle} onClick={ () => {handleAddOpen()} } >
                                    <AddIcon style={{"color": "var(--white)", "fontSize": "2rem"}} />
                                </Button>
                            </ThemeProvider>
                        </div>

                    </div>

                    <div style={{"paddingBottom": "3rem"}}>

                        <Grid container spacing={2}>

                            {
                                rawDataFirebase.map(data => {

                                    return (
                                        <Grid item style={DataCardStyle}>

                                            <div style={{"height": "70%"}}>
                                                <Typography style={DataCardTitleStyle}>{data[0].data_title}</Typography>
                                                <Typography style={DataCardDescStyle}>{data[0].data_description}</Typography>
                                                <Typography style={DataCardDescStyle}>{data[0].data_datetime}</Typography>
                                                <Typography style={DataCardDescStyle}><b>ID: </b>{data[1]}</Typography>
                                                <Typography style={DataCardDescStyle}><b>File type: </b>.csv</Typography>
                                            </div>
                                            
                                            <div>
                                                <ThemeProvider theme={LoginButtonTheme}>
                                                    <Button color="primary" variant="contained" style={PreviewDataButtonStyle} onClick={() => redirectToDataViewer(data[1])}>Preview</Button>
                                                </ThemeProvider>
                                                <Typography onClick={() => directFileDownload(data[1]+".csv")} style={{...DataCardDescStyle,... {"textDecoration": "underline", "textAlign": "center", "marginTop": "0.5rem", "cursor": "pointer"}}}>Direct Download</Typography>
                                            </div>
                                            
                                        </Grid>
                                    )

                                })
                            }

                            

                        </Grid>

                    </div>

                </Container>

            </div>

        </div>

    )


}

export default Data;