import { React, useState, useEffect, useLayoutEffect } from "react";
import { useHistory } from "react-router";
import Firebase from "../Firebase";
import crypto from "crypto";

import 
{ 
    Button, Container, Typography, Modal, TextField, Box, Select, MenuItem, RadioGroup, Radio, FormControlLabel, Checkbox, FormGroup
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
    const [invalidState, setInvalidState] = useState("");
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
        if (event.length <= 0) {
            setIsCountry(false);
        }
        else {
            setIsCountry(true);
        }
    }

    function handleState(event) {
        if (event.length <= 0) {
            setInvalidState("Por favor insira seu estado.");
            setIsState(false);
        }
        else {
            setInvalidState("");
            setIsState(true);
        }
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
        }
        else {
            setTerms(true);
        }
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
        borderRadius: "10px"
    }
    
    return (

        <div style={{"height": "100%"}}>

            <Container align="center" style={{"height": "100%"}}>

                <header>
                    <div style={{"float": "right", "marginTop": "1.5rem"}}>
                        <HeaderButton text="Home" url="/" icon="backarrow"/>
                    </div>
                </header>

                <Modal open={open} onClose={handleClose} style={{"marginTop": "10%"}}>

                    <Container align="center" maxwidth="lg" style={{"border": "none"}}>
                        <Box style={ModalBoxStyle}>

                            <Typography variant="h3">Termos e condições do cadastro Sollarium</Typography>
                            <Typography variant="p">
                                Ao se cadastrar na plataforma web do projeto Sollarium, você está concordando com os 
                                seguintes termos:
                            </Typography>
                            <Typograpgy ></Typograpgy>

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
                        <Select id="country" style={{"width": "20rem", "marginTop": "0.1rem", "float": "left", "marginLeft": "5rem"}} onChange={ (e) => { setCountry(e.target.value); handleCountry(e.target.value) } } >
                            <MenuItem value="Afganistan">Afghanistan</MenuItem>
                            <MenuItem value="Albania">Albania</MenuItem>
                            <MenuItem value="Algeria">Algeria</MenuItem>
                            <MenuItem value="American Samoa">American Samoa</MenuItem>
                            <MenuItem value="Andorra">Andorra</MenuItem>
                            <MenuItem value="Angola">Angola</MenuItem>
                            <MenuItem value="Anguilla">Anguilla</MenuItem>
                            <MenuItem value="Antigua & Barbuda">Antigua & Barbuda</MenuItem>
                            <MenuItem value="Argentina">Argentina</MenuItem>
                            <MenuItem value="Armenia">Armenia</MenuItem>
                            <MenuItem value="Aruba">Aruba</MenuItem>
                            <MenuItem value="Australia">Australia</MenuItem>
                            <MenuItem value="Austria">Austria</MenuItem>
                            <MenuItem value="Azerbaijan">Azerbaijan</MenuItem>
                            <MenuItem value="Bahamas">Bahamas</MenuItem>
                            <MenuItem value="Bahrain">Bahrain</MenuItem>
                            <MenuItem value="Bangladesh">Bangladesh</MenuItem>
                            <MenuItem value="Barbados">Barbados</MenuItem>
                            <MenuItem value="Belarus">Belarus</MenuItem>
                            <MenuItem value="Belgium">Belgium</MenuItem>
                            <MenuItem value="Belize">Belize</MenuItem>
                            <MenuItem value="Benin">Benin</MenuItem>
                            <MenuItem value="Bermuda">Bermuda</MenuItem>
                            <MenuItem value="Bhutan">Bhutan</MenuItem>
                            <MenuItem value="Bolivia">Bolivia</MenuItem>
                            <MenuItem value="Bonaire">Bonaire</MenuItem>
                            <MenuItem value="Bosnia & Herzegovina">Bosnia & Herzegovina</MenuItem>
                            <MenuItem value="Botswana">Botswana</MenuItem>
                            <MenuItem value="Brazil">Brazil</MenuItem>
                            <MenuItem value="British Indian Ocean Ter">British Indian Ocean Ter</MenuItem>
                            <MenuItem value="Brunei">Brunei</MenuItem>
                            <MenuItem value="Bulgaria">Bulgaria</MenuItem>
                            <MenuItem value="Burkina Faso">Burkina Faso</MenuItem>
                            <MenuItem value="Burundi">Burundi</MenuItem>
                            <MenuItem value="Cambodia">Cambodia</MenuItem>
                            <MenuItem value="Cameroon">Cameroon</MenuItem>
                            <MenuItem value="Canada">Canada</MenuItem>
                            <MenuItem value="Canary Islands">Canary Islands</MenuItem>
                            <MenuItem value="Cape Verde">Cape Verde</MenuItem>
                            <MenuItem value="Cayman Islands">Cayman Islands</MenuItem>
                            <MenuItem value="Central African Republic">Central African Republic</MenuItem>
                            <MenuItem value="Chad">Chad</MenuItem>
                            <MenuItem value="Channel Islands">Channel Islands</MenuItem>
                            <MenuItem value="Chile">Chile</MenuItem>
                            <MenuItem value="China">China</MenuItem>
                            <MenuItem value="Christmas Island">Christmas Island</MenuItem>
                            <MenuItem value="Cocos Island">Cocos Island</MenuItem>
                            <MenuItem value="Colombia">Colombia</MenuItem>
                            <MenuItem value="Comoros">Comoros</MenuItem>
                            <MenuItem value="Congo">Congo</MenuItem>
                            <MenuItem value="Cook Islands">Cook Islands</MenuItem>
                            <MenuItem value="Costa Rica">Costa Rica</MenuItem>
                            <MenuItem value="Cote DIvoire">Cote DIvoire</MenuItem>
                            <MenuItem value="Croatia">Croatia</MenuItem>
                            <MenuItem value="Cuba">Cuba</MenuItem>
                            <MenuItem value="Curaco">Curacao</MenuItem>
                            <MenuItem value="Cyprus">Cyprus</MenuItem>
                            <MenuItem value="Czech Republic">Czech Republic</MenuItem>
                            <MenuItem value="Denmark">Denmark</MenuItem>
                            <MenuItem value="Djibouti">Djibouti</MenuItem>
                            <MenuItem value="Dominica">Dominica</MenuItem>
                            <MenuItem value="Dominican Republic">Dominican Republic</MenuItem>
                            <MenuItem value="East Timor">East Timor</MenuItem>
                            <MenuItem value="Ecuador">Ecuador</MenuItem>
                            <MenuItem value="Egypt">Egypt</MenuItem>
                            <MenuItem value="El Salvador">El Salvador</MenuItem>
                            <MenuItem value="Equatorial Guinea">Equatorial Guinea</MenuItem>
                            <MenuItem value="Eritrea">Eritrea</MenuItem>
                            <MenuItem value="Estonia">Estonia</MenuItem>
                            <MenuItem value="Ethiopia">Ethiopia</MenuItem>
                            <MenuItem value="Falkland Islands">Falkland Islands</MenuItem>
                            <MenuItem value="Faroe Islands">Faroe Islands</MenuItem>
                            <MenuItem value="Fiji">Fiji</MenuItem>
                            <MenuItem value="Finland">Finland</MenuItem>
                            <MenuItem value="France">France</MenuItem>
                            <MenuItem value="French Guiana">French Guiana</MenuItem>
                            <MenuItem value="French Polynesia">French Polynesia</MenuItem>
                            <MenuItem value="French Southern Ter">French Southern Ter</MenuItem>
                            <MenuItem value="Gabon">Gabon</MenuItem>
                            <MenuItem value="Gambia">Gambia</MenuItem>
                            <MenuItem value="Georgia">Georgia</MenuItem>
                            <MenuItem value="Germany">Germany</MenuItem>
                            <MenuItem value="Ghana">Ghana</MenuItem>
                            <MenuItem value="Gibraltar">Gibraltar</MenuItem>
                            <MenuItem value="Great Britain">Great Britain</MenuItem>
                            <MenuItem value="Greece">Greece</MenuItem>
                            <MenuItem value="Greenland">Greenland</MenuItem>
                            <MenuItem value="Grenada">Grenada</MenuItem>
                            <MenuItem value="Guadeloupe">Guadeloupe</MenuItem>
                            <MenuItem value="Guam">Guam</MenuItem>
                            <MenuItem value="Guatemala">Guatemala</MenuItem>
                            <MenuItem value="Guinea">Guinea</MenuItem>
                            <MenuItem value="Guyana">Guyana</MenuItem>
                            <MenuItem value="Haiti">Haiti</MenuItem>
                            <MenuItem value="Hawaii">Hawaii</MenuItem>
                            <MenuItem value="Honduras">Honduras</MenuItem>
                            <MenuItem value="Hong Kong">Hong Kong</MenuItem>
                            <MenuItem value="Hungary">Hungary</MenuItem>
                            <MenuItem value="Iceland">Iceland</MenuItem>
                            <MenuItem value="Indonesia">Indonesia</MenuItem>
                            <MenuItem value="India">India</MenuItem>
                            <MenuItem value="Iran">Iran</MenuItem>
                            <MenuItem value="Iraq">Iraq</MenuItem>
                            <MenuItem value="Ireland">Ireland</MenuItem>
                            <MenuItem value="Isle of Man">Isle of Man</MenuItem>
                            <MenuItem value="Israel">Israel</MenuItem>
                            <MenuItem value="Italy">Italy</MenuItem>
                            <MenuItem value="Jamaica">Jamaica</MenuItem>
                            <MenuItem value="Japan">Japan</MenuItem>
                            <MenuItem value="Jordan">Jordan</MenuItem>
                            <MenuItem value="Kazakhstan">Kazakhstan</MenuItem>
                            <MenuItem value="Kenya">Kenya</MenuItem>
                            <MenuItem value="Kiribati">Kiribati</MenuItem>
                            <MenuItem value="Korea North">Korea North</MenuItem>
                            <MenuItem value="Korea Sout">Korea South</MenuItem>
                            <MenuItem value="Kuwait">Kuwait</MenuItem>
                            <MenuItem value="Kyrgyzstan">Kyrgyzstan</MenuItem>
                            <MenuItem value="Laos">Laos</MenuItem>
                            <MenuItem value="Latvia">Latvia</MenuItem>
                            <MenuItem value="Lebanon">Lebanon</MenuItem>
                            <MenuItem value="Lesotho">Lesotho</MenuItem>
                            <MenuItem value="Liberia">Liberia</MenuItem>
                            <MenuItem value="Libya">Libya</MenuItem>
                            <MenuItem value="Liechtenstein">Liechtenstein</MenuItem>
                            <MenuItem value="Lithuania">Lithuania</MenuItem>
                            <MenuItem value="Luxembourg">Luxembourg</MenuItem>
                            <MenuItem value="Macau">Macau</MenuItem>
                            <MenuItem value="Macedonia">Macedonia</MenuItem>
                            <MenuItem value="Madagascar">Madagascar</MenuItem>
                            <MenuItem value="Malaysia">Malaysia</MenuItem>
                            <MenuItem value="Malawi">Malawi</MenuItem>
                            <MenuItem value="Maldives">Maldives</MenuItem>
                            <MenuItem value="Mali">Mali</MenuItem>
                            <MenuItem value="Malta">Malta</MenuItem>
                            <MenuItem value="Marshall Islands">Marshall Islands</MenuItem>
                            <MenuItem value="Martinique">Martinique</MenuItem>
                            <MenuItem value="Mauritania">Mauritania</MenuItem>
                            <MenuItem value="Mauritius">Mauritius</MenuItem>
                            <MenuItem value="Mayotte">Mayotte</MenuItem>
                            <MenuItem value="Mexico">Mexico</MenuItem>
                            <MenuItem value="Midway Islands">Midway Islands</MenuItem>
                            <MenuItem value="Moldova">Moldova</MenuItem>
                            <MenuItem value="Monaco">Monaco</MenuItem>
                            <MenuItem value="Mongolia">Mongolia</MenuItem>
                            <MenuItem value="Montserrat">Montserrat</MenuItem>
                            <MenuItem value="Morocco">Morocco</MenuItem>
                            <MenuItem value="Mozambique">Mozambique</MenuItem>
                            <MenuItem value="Myanmar">Myanmar</MenuItem>
                            <MenuItem value="Nambia">Nambia</MenuItem>
                            <MenuItem value="Nauru">Nauru</MenuItem>
                            <MenuItem value="Nepal">Nepal</MenuItem>
                            <MenuItem value="Netherland Antilles">Netherland Antilles</MenuItem>
                            <MenuItem value="Netherlands">Netherlands (Holland, Europe)</MenuItem>
                            <MenuItem value="Nevis">Nevis</MenuItem>
                            <MenuItem value="New Caledonia">New Caledonia</MenuItem>
                            <MenuItem value="New Zealand">New Zealand</MenuItem>
                            <MenuItem value="Nicaragua">Nicaragua</MenuItem>
                            <MenuItem value="Niger">Niger</MenuItem>
                            <MenuItem value="Nigeria">Nigeria</MenuItem>
                            <MenuItem value="Niue">Niue</MenuItem>
                            <MenuItem value="Norfolk Island">Norfolk Island</MenuItem>
                            <MenuItem value="Norway">Norway</MenuItem>
                            <MenuItem value="Oman">Oman</MenuItem>
                            <MenuItem value="Pakistan">Pakistan</MenuItem>
                            <MenuItem value="Palau Island">Palau Island</MenuItem>
                            <MenuItem value="Palestine">Palestine</MenuItem>
                            <MenuItem value="Panama">Panama</MenuItem>
                            <MenuItem value="Papua New Guinea">Papua New Guinea</MenuItem>
                            <MenuItem value="Paraguay">Paraguay</MenuItem>
                            <MenuItem value="Peru">Peru</MenuItem>
                            <MenuItem value="Phillipines">Philippines</MenuItem>
                            <MenuItem value="Pitcairn Island">Pitcairn Island</MenuItem>
                            <MenuItem value="Poland">Poland</MenuItem>
                            <MenuItem value="Portugal">Portugal</MenuItem>
                            <MenuItem value="Puerto Rico">Puerto Rico</MenuItem>
                            <MenuItem value="Qatar">Qatar</MenuItem>
                            <MenuItem value="Republic of Montenegro">Republic of Montenegro</MenuItem>
                            <MenuItem value="Republic of Serbia">Republic of Serbia</MenuItem>
                            <MenuItem value="Reunion">Reunion</MenuItem>
                            <MenuItem value="Romania">Romania</MenuItem>
                            <MenuItem value="Russia">Russia</MenuItem>
                            <MenuItem value="Rwanda">Rwanda</MenuItem>
                            <MenuItem value="St Barthelemy">St Barthelemy</MenuItem>
                            <MenuItem value="St Eustatius">St Eustatius</MenuItem>
                            <MenuItem value="St Helena">St Helena</MenuItem>
                            <MenuItem value="St Kitts-Nevis">St Kitts-Nevis</MenuItem>
                            <MenuItem value="St Lucia">St Lucia</MenuItem>
                            <MenuItem value="St Maarten">St Maarten</MenuItem>
                            <MenuItem value="St Pierre & Miquelon">St Pierre & Miquelon</MenuItem>
                            <MenuItem value="St Vincent & Grenadines">St Vincent & Grenadines</MenuItem>
                            <MenuItem value="Saipan">Saipan</MenuItem>
                            <MenuItem value="Samoa">Samoa</MenuItem>
                            <MenuItem value="Samoa American">Samoa American</MenuItem>
                            <MenuItem value="San Marino">San Marino</MenuItem>
                            <MenuItem value="Sao Tome & Principe">Sao Tome & Principe</MenuItem>
                            <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
                            <MenuItem value="Senegal">Senegal</MenuItem>
                            <MenuItem value="Seychelles">Seychelles</MenuItem>
                            <MenuItem value="Sierra Leone">Sierra Leone</MenuItem>
                            <MenuItem value="Singapore">Singapore</MenuItem>
                            <MenuItem value="Slovakia">Slovakia</MenuItem>
                            <MenuItem value="Slovenia">Slovenia</MenuItem>
                            <MenuItem value="Solomon Islands">Solomon Islands</MenuItem>
                            <MenuItem value="Somalia">Somalia</MenuItem>
                            <MenuItem value="South Africa">South Africa</MenuItem>
                            <MenuItem value="Spain">Spain</MenuItem>
                            <MenuItem value="Sri Lanka">Sri Lanka</MenuItem>
                            <MenuItem value="Sudan">Sudan</MenuItem>
                            <MenuItem value="Suriname">Suriname</MenuItem>
                            <MenuItem value="Swaziland">Swaziland</MenuItem>
                            <MenuItem value="Sweden">Sweden</MenuItem>
                            <MenuItem value="Switzerland">Switzerland</MenuItem>
                            <MenuItem value="Syria">Syria</MenuItem>
                            <MenuItem value="Tahiti">Tahiti</MenuItem>
                            <MenuItem value="Taiwan">Taiwan</MenuItem>
                            <MenuItem value="Tajikistan">Tajikistan</MenuItem>
                            <MenuItem value="Tanzania">Tanzania</MenuItem>
                            <MenuItem value="Thailand">Thailand</MenuItem>
                            <MenuItem value="Togo">Togo</MenuItem>
                            <MenuItem value="Tokelau">Tokelau</MenuItem>
                            <MenuItem value="Tonga">Tonga</MenuItem>
                            <MenuItem value="Trinidad & Tobago">Trinidad & Tobago</MenuItem>
                            <MenuItem value="Tunisia">Tunisia</MenuItem>
                            <MenuItem value="Turkey">Turkey</MenuItem>
                            <MenuItem value="Turkmenistan">Turkmenistan</MenuItem>
                            <MenuItem value="Turks & Caicos Is">Turks & Caicos Is</MenuItem>
                            <MenuItem value="Tuvalu">Tuvalu</MenuItem>
                            <MenuItem value="Uganda">Uganda</MenuItem>
                            <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                            <MenuItem value="Ukraine">Ukraine</MenuItem>
                            <MenuItem value="United Arab Erimates">United Arab Emirates</MenuItem>
                            <MenuItem value="United States of America">United States of America</MenuItem>
                            <MenuItem value="Uraguay">Uruguay</MenuItem>
                            <MenuItem value="Uzbekistan">Uzbekistan</MenuItem>
                            <MenuItem value="Vanuatu">Vanuatu</MenuItem>
                            <MenuItem value="Vatican City State">Vatican City State</MenuItem>
                            <MenuItem value="Venezuela">Venezuela</MenuItem>
                            <MenuItem value="Vietnam">Vietnam</MenuItem>
                            <MenuItem value="Virgin Islands (Brit)">Virgin Islands (Brit)</MenuItem>
                            <MenuItem value="Virgin Islands (USA)">Virgin Islands (USA)</MenuItem>
                            <MenuItem value="Wake Island">Wake Island</MenuItem>
                            <MenuItem value="Wallis & Futana Is">Wallis & Futana Is</MenuItem>
                            <MenuItem value="Yemen">Yemen</MenuItem>
                            <MenuItem value="Zaire">Zaire</MenuItem>
                            <MenuItem value="Zambia">Zambia</MenuItem>
                            <MenuItem value="Zimbabwe">Zimbabwe</MenuItem>
                        </Select>

                        <div style={{"width": "100%", "overflow": "auto"}}>
                            <TextField type="text" id="state" label="Estado" placeholder="Insira seu estado" style={TextFieldStyle} onChange={ (e) => { setState(e.target.value); handleState(e.target.value) } } />
                            <label style={InvalidInputTextStyle} id="invalidState">{invalidState}</label>
                        </div>
                        
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
                        <Checkbox id="terms" defaultChecked={false} onChange={ () => handleTermsCheckbox() } />
                        <Typography variant="p" style={{paddingTop: "0.1rem", cursor: "pointer"}} onClick={handleOpen}>Concordo com os <b>Termos e condições.</b></Typography>
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