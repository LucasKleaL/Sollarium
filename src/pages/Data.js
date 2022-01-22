import { React, useState, useEffect, useLayoutEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Firebase from "./../Firebase";
import crypto from "crypto";

import { Button, Container, Typography, Modal, TextField, Box } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import "./../styles/data.css";

import LoginButtonTheme from "../themes/LoginButtonTheme";

function Data() {

    var history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
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
                Firebase.firestore().collection("users").doc(uid).get()
                    .then((snapshot) => {
                        //
                    })
            }
            else {
                handleOpen();
            }
        });
    }, [open])

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
        </div>

    )

}

export default Data;