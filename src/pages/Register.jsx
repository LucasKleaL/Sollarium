import { React, useState } from "react";
import { useHistory } from "react-router";
import Firebase from "../Firebase";
import crypto from "crypto";

import countries from "./../countries";

import 
{ 
    Button, Container, Typography, Modal, TextField, Box, Select, MenuItem, RadioGroup, Radio, FormControlLabel, Checkbox
} 
from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import HeaderButton from "../components/HeaderButton";
import LoginButtonTheme from "../themes/LoginButtonTheme";

function Register() {

    const history = useHistory();

    //form input variables
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [completeName, setCompleteName] = useState("");
    const [birthdayDate, setBirthdayDate] = useState("");
    const [gender, setGender] = useState("female");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [occupation, setOccupation] = useState("");
    const [password, setPassword] = useState("");
    const [retryPassword, setRetryPassword] = useState("");
    const [terms, setTerms] = useState(false);
    const [termsCheckBox, setTermsCheckBox] = useState(false);

    //form input verification variables
    const [isEmail, setIsEmail] = useState(false);
    const [isUsername, setIsUsername] = useState(false);
    const [isCompleteName, setIsCompleteName] = useState(false);
    const [isBirthdayDate, setIsBirthdayDate] = useState(false);
    const [isCountry, setIsCountry] = useState(false);
    const [isState, setIsState]= useState(false);
    const [isCity, setIsCity] = useState(false);
    const [isOccupation, setIsOccupation] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isRetryPassword, setIsRetryPassword] = useState(false);

    //invalid input texts alerts variables
    const [invalidEmail, setInvalidEmail] = useState("");
    const [invalidUsername, setInvalidUsername] = useState("");
    const [invalidCompleteName, setInvalidCompleteName] = useState("");
    const [invalidBirthdayDate, setInvalidBirthdayDate] = useState("");
    const [invalidCity, setInvalidCity] = useState("");
    const [invalidOccupation, setInvalidOccupation] = useState("");
    const [invalidPassword, setInvalidPassword] = useState("");
    const [invalidRetryPassword, setInvalidRetryPassword] = useState("");

    //terms modal variables
    const [open, setOpen] = useState("");

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    function signup() {
        
        if (terms && isEmail && isUsername && isCompleteName && isBirthdayDate && isCountry && isState && isCity && isOccupation && isPassword && isRetryPassword) {

            let hashPassword = crypto.createHash("sha256").update(password).digest("hex");
            let hashRetryPassword = crypto.createHash("sha256").update(retryPassword).digest("hex");

            let date = new Date();
            let datetime = date.toLocaleDateString("pt-br", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            });

            Firebase.auth().createUserWithEmailAndPassword(email, hashPassword)
            .then((value) => {
                Firebase.firestore().collection("users").doc(value.user.uid)
                .set({
                    username: username,
                    complete_name: completeName,
                    birthday_date: birthdayDate,
                    gender: gender,
                    occupation: occupation,
                    country: country,
                    state: state,
                    city: city,
                    registration_datetime: datetime,
                    permitions: "default",
                })
                .then(() => {
                    alert("Conta criada com sucesso!");
                    history.push("/data")
                })
            })
            .catch((error) => {
                if (error.code === "auth/weak-password") {
                    alert("A senha é muito fraca!");
                }
                else if (error.code === "auth/email-already-in-use") {
                    alert("O email já está sendo usando.")
                }
                else if (error.code === "auth/invalid-email") {
                    alert("O email fornecido é inválido.")
                }
            });
            
        }
        else {
            alert("Um ou mais campos estão faltando, por favor verifique e tente novamente.")
        }

    }

    //functions responsible to verify if inputs are valid
    function handleEmail(event) {
        if (event.length <= 0) {
            setInvalidEmail("Por favor insira um email válido.");
            setIsEmail(false);
        }
        else {
            setInvalidEmail("");
            setIsEmail(true);
        }
    }

    function handleUsername(event) {
        if (event.length < 5) {
            setInvalidUsername("Seu nome de usuário deve ter pelo menos 5 caracteres.");
            setIsUsername(false);
        }
        else {
            setInvalidUsername("");
            setIsUsername(true)
        }
    }

    function handleCompleteName(event) {
        if (event.length <= 0) {
            setInvalidCompleteName("Por favor insira seu nome completo.");
            setIsCompleteName(false);
        }
        else {
            setInvalidCompleteName("");
            setIsCompleteName(true);
        }
    }

    function handleBirthdayDate(event) {
        if (event.length <= 0) {
            setInvalidBirthdayDate("Por favor selecione sua data de nascimento.");
            setIsBirthdayDate(false);
        }
        else {
            setInvalidBirthdayDate("");
            setIsBirthdayDate(true);
        }
    }

    function handleCountry(event) {
        setCountry(event.target.value);
        setIsCountry(true);
    }

    function handleState(event) {
        setState(event.target.value);
        setIsState(true);
    }

    function handleCity(event) {
        if (event.length <= 0) {
            setInvalidCity("Por favor insira sua cidade.");
            setIsCity(false);
        }
        else {
            setInvalidCity("");
            setIsCity(true);
        }
    }

    function handleOccupation(event) {
        if (event.length <= 0) {
            setInvalidOccupation("Por favor insira sua ocupação/trabalho.");
            setIsOccupation(false);
        }
        else {
            setInvalidOccupation("");
            setIsOccupation(true);
        }
    }

    function handlePassword(event) {
        if (event.length < 6) {
            setInvalidPassword("Sua senha deve ter no mínimo seis caracteres.");
            setIsPassword(false);
        }
        else {
            setInvalidPassword("");
            setIsPassword(true);
        }
    }

    function handleRetryPassword(event) {
        if (event === password) {
            setInvalidRetryPassword("");
            setIsRetryPassword(true);
        }
        else {
            setInvalidRetryPassword("As senhas não são iguais, por favor verifique.");
            setIsRetryPassword(false);
        }
    }

    function handleTermsCheckbox() {
        if (terms) {
            setTerms(false);
            setTermsCheckBox(false);
        }
        else {
            setTerms(true);
            setTermsCheckBox(true);
        }
    }

    function handleAgreeTermsModal() {
        setTermsCheckBox(true);
        setTerms(true);
        handleClose();
    }

    const RegisterBoxStyle = {
        width: "30rem",
        backgroundColor: "var(--white-background)",
        borderRadius: "10px",
        marginTop: "1rem",
        overflow: "auto"
    }

    const TextFieldStyle = {
        width: "20rem",
        marginTop: "1rem",
        float: "left",
        marginLeft: "5rem"
    }

    const FormSelectStyle = {
        width: "20rem", 
        marginTop: "0.1rem", 
        float: "left", 
        marginLeft: "5rem"
    }

    const InvalidInputTextStyle = {
        color: "var(--red-fire)",
        fontSize: "0.8rem",
        float: "left",
        marginLeft: "5rem",
        marginTop: "0.1rem"
    }

    const FormInputTitleStyle = {
        color: "var(--material-blue)",
        fontSize: "0.8rem",
        float: "left",
        marginLeft: "5rem",
        marginTop: "1rem"
    }

    const SignupButtonStyle = {
        width: "5rem",
        height: "2.5rem",
        marginTop: "1rem",
        textTransform: "capitalize",
    }

    const ModalBoxStyle = {
        width: "30rem",
        backgroundColor: "var(--white-background)",
        borderRadius: "10px",
        overflow: "auto"
    }

    const ModalTextStyle = {
        fontSize: "1rem",
        fontWeigth: "initial",
        textAlign: "left",
        marginTop: "0.5rem",
        display: "block"
    }

    const CloseModalButton = {
        width: "2rem",
        height: "2rem",
        borderRadius: "100%",
        float: "right",
        border: "0",
        cursor: "pointer"
    }
    
    return (

        <div style={{"height": "100%"}}>

            <Container align="center" style={{"height": "100%"}}>

                <header>
                    <div style={{"float": "right", "marginTop": "1.5rem"}}>
                        <HeaderButton text="Home" url="/" icon="backarrow"/>
                    </div>
                </header>

                <Modal open={open} onClose={handleClose} style={{marginBottom: "2%", marginTop: "2%", overflow: "scroll"}}>

                    <Container align="center" maxwidth="lg" style={{border: "none"}}>
                        <Box style={ModalBoxStyle}>

                            <div style={{paddingBottom: "1rem", paddingTop: "0.5rem", paddingLeft: "1rem", paddingRight: "0.5rem"}}>
                                <button style={CloseModalButton} onClick={handleClose}>X</button>
                            </div>

                            <div style={{paddingBottom: "1rem", paddingTop: "1rem", paddingLeft: "1rem", paddingRight: "1rem"}}>
                                <Typography variant="h4">Termos e condições do cadastro Sollarium</Typography>
                                <Typography style={ModalTextStyle}>
                                    Ao se cadastrar na plataforma web da missão Sollarium, você está concordando com os 
                                    seguintes termos:
                                </Typography>
                                <Typography style={ModalTextStyle}> 
                                    • Os dados provenintes de nosso cubesat não deverão ser utilizados para fins comerciais, apenas usos 
                                    educacionais, de pesquisa ou de divulgação são permitidos.
                                </Typography>
                                <Typography style={ModalTextStyle}>
                                    • Qualquer iniciativa que fará o uso de tecnologia desenvolvida para o cubesat Sollarium deverá ser open
                                    source (pública), para o acesso de qualquer interessado.
                                </Typography>
                                <Typography style={ModalTextStyle}>
                                    • O uso de qualquer material do projeto Sollarium por terceiros, deverá obrigatoriamente apresentar os devidos 
                                    créditos.
                                </Typography>
                                <Typography style={ModalTextStyle}>
                                    • Os dados de cada usuário gerados durante o cadastro serão armazenados no serviço Firebase provido pela 
                                    Google, seguindo as melhores práticas de segurança de acordo com a LGPD.
                                </Typography>
                                <Typography style={ModalTextStyle}>
                                    • Após o cadastro, nós da equipe Sollarium não possuímos acesso a nenhum dado sensível do usuário, 
                                    como por exemplo a senha da conta.
                                </Typography>
                                <Typography style={ModalTextStyle}>
                                    • Para acessar os dados do Cubesat Sollarium é obrigatório a autenticação do usuário.
                                </Typography>

                                <div>
                                    <ThemeProvider theme={LoginButtonTheme}>
                                        <Button color="primary" variant="contained" style={SignupButtonStyle} onClick={handleAgreeTermsModal}>Concordo</Button>
                                        <Button color="primary" variant="outlined" style={{...SignupButtonStyle,...{marginLeft: "0.2rem"}}} onClick={handleClose}>Fechar</Button>
                                    </ThemeProvider>
                                </div>

                            </div>

                        </Box>
                    </Container>

                </Modal>
            
                <Box style={RegisterBoxStyle}>

                    <div style={{"width": "100%"}}>
                        
                        <div style={{"width": "100%", "overflow": "auto"}}>
                            <TextField type="email" id="email" label="Email" placeholder="Insira seu email" style={TextFieldStyle} onChange={ (e) => { setEmail(e.target.value); handleEmail(e.target.value) } } />
                            <label id="invalidEmail" style={InvalidInputTextStyle}>{invalidEmail}</label>
                        </div>

                        <div style={{"width": "100%", "overflow": "auto"}}>
                            <TextField type="text" id="username" label="Nome de usuário" placeholder="Insira seu username" style={TextFieldStyle} onChange={ (e) => { setUsername(e.target.value); handleUsername(e.target.value) } }/>
                            <label id="invalidUsername" style={InvalidInputTextStyle}>{invalidUsername}</label>
                        </div>

                        <div style={{"width": "100%", "overflow": "auto"}}>
                            <TextField type="text" id="completeName" label="Nome completo" placeholder="Insira seu nome completo" style={TextFieldStyle} onChange={ (e) => { setCompleteName(e.target.value); handleCompleteName(e.target.value) } }/>
                            <label id="invalidCompleteName" style={InvalidInputTextStyle}>{invalidCompleteName}</label>
                        </div>
                        
                        <div style={{"width": "100%", "overflow": "auto"}}>
                            <label for="birthdayDate" style={FormInputTitleStyle}>Data de nascimento</label>
                            <TextField id="birthdayDate" type="date" style={{"width": "20rem", "marginTop": "0.1rem", "float": "left", "marginLeft": "5rem"}} onChange={ (e) => {setBirthdayDate(e.target.value); handleBirthdayDate(e.target.value)} } />
                            <label id="invalidBirthdayDate" style={InvalidInputTextStyle}>{invalidBirthdayDate}</label>
                        </div>
                        
                        <label for="gender" style={FormInputTitleStyle}>Gênero</label>
                        <RadioGroup id="gender" defaultValue="female" style={{"width": "20rem", "marginTop": "0.1rem", "float": "left", "marginLeft": "5rem"}} onChange={ (e) => { setGender(e.target.value) } } >
                            <FormControlLabel value="female" control={<Radio />} label="Feminino" />
                            <FormControlLabel value="male" control={<Radio />} label="Masculino" />
                            <FormControlLabel value="other" control={<Radio />} label="Outro" />
                        </RadioGroup>
                        
                        <label for="country" style={FormInputTitleStyle}>Páis de origem</label>
                        <Select id="country" value={country} onChange={handleCountry} style={FormSelectStyle}>
                            {
                                countries.map((country) => (
                                    <MenuItem value={country.countryName} key={country.countryShortCode}>
                                        {country.countryName}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                        
                        <label for="country" style={FormInputTitleStyle}>Estado</label>
                        <Select id="state" value={state} disabled={!country} onChange={handleState} style={FormSelectStyle}>
                            {
                                country
                                ? countries
                                    .find(({ countryName }) => countryName === country)
                                    .regions.map((region) => (
                                      <MenuItem value={region.name} key={region.shortCode}>
                                        {region.name}
                                      </MenuItem>
                                    ))
                                : <MenuItem>Por favor selecione um país</MenuItem>
                            }
                        </Select>
                        
                        <div style={{"width": "100%", "overflow": "auto"}}>
                            <TextField type="text" id="city" label="Cidade" placeholder="Insira sua cidade" style={TextFieldStyle} onChange={ (e) => { setCity(e.target.value); handleCity(e.target.value) } } />
                            <label style={InvalidInputTextStyle} id="invalidCity">{invalidCity}</label>
                        </div>

                        <div style={{"width": "100%", "overflow": "auto"}}>
                            <TextField type="text" id="occupation" label="Ocupação" placeholder="Insira sua ocupação ex: Estudante" style={TextFieldStyle} onChange={ (e) => { setOccupation(e.target.value); handleOccupation(e.target.value) } } />
                            <label style={InvalidInputTextStyle} id="invalidOccupation">{invalidOccupation}</label>
                        </div>
                        
                        <div style={{"width": "100%", "overflow": "auto"}}>
                            <TextField type="password" id="password" label="Senha" placeholder="Insira uma senha de confiança" style={TextFieldStyle} onChange={ (e) => { setPassword(e.target.value); handlePassword(e.target.value) } } />
                            <label style={InvalidInputTextStyle} id="invalidPassword">{invalidPassword}</label>
                        </div>
                        
                        <div style={{"width": "100%", "overflow": "auto"}}>
                            <TextField type="password" id="retryPassword" label="Confirme a senha" placeholder="Confirme sua senha" style={TextFieldStyle} onChange={ (e) => { setRetryPassword(e.target.value); handleRetryPassword(e.target.value) } } />
                            <label style={InvalidInputTextStyle} id="invalidRetryPassword">{invalidRetryPassword}</label>
                        </div>
                           
                    </div>

                    <div style={{"paddingTop": "1rem", "marginBottom": "1rem", "overflow": "auto", "width": "100%" }}>
                        <Typography variant="p" style={{"marginLeft": "5rem", "marginRight": "5rem", "float": "left", "textAlign": "justify"}}>
                            Para garantir o controle e contato com os interessados em obter dados da Missão Sollarium,
                            exigimos que todos os acessos estejam devidamente autenticados com uma conta válida.
                        </Typography>
                    </div>

                    <div>
                        <Checkbox id="terms" checked={termsCheckBox} onChange={ () => handleTermsCheckbox() } />
                        <Typography variant="p" style={{paddingTop: "0.1rem", cursor: "pointer"}} onClick={handleOpen}>
                            Concordo com os 
                            <b style={{color: "var(--material-blue)", fontWeight: "400"}}> Termos e Condições.</b>
                        </Typography>
                    </div>
                    
                    <div style={{"paddingBottom": "2rem"}}>
                        <ThemeProvider theme={LoginButtonTheme}>
                            <Button color="primary" variant="contained" style={SignupButtonStyle} onClick={signup}>Signup</Button>
                        </ThemeProvider>
                    </div>
                    
                </Box>

            </Container>
        </div>
        
    )

}

export default Register;