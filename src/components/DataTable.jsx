import { React, Component } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { withStyles } from "@material-ui/styles";
import PropTypes from 'prop-types';

import { Button, Container, Typography, Modal } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import LoginButtonTheme from "../themes/LoginButtonTheme";

const styles = theme => ({
    root: {
        background: "var(--white-background)",
    }
});

class DataTable extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const data = this.props.data;
        const dataUid = this.props.dataUid;
        const dataInfos = this.props.dataInfos;
        const { classes } = this.props;

        let content;

        const DataTitleStyle = {
            fontSize: "2rem",
            color: "var(--white)",
            textAlign: "left",
            fontWeight: "900"
        }

        const DataIdStyle = {
            fontSize: "1.2rem",
            color: "var(--white)",
            textAlign: "left",
        }

        const DataDescStyle = {
            fontSize: "1rem",
            color: "var(--white)",
            textAlign: "left"
        }

        const ChartsButtonStyle = {
            width: "8rem",
            height: "3rem",
            textTransform: "capitalize",
            fontWeigth: "bold",
            float: "left"
        }

        const ChartsDescStyle = {
            fontSize: "0.8rem",
            color: "var(--white)",
            float: "right",
            textAlign: "left",
            marginTop: "0.1rem"
        }

        if (data.length >= 1) {
            console.log("if >= 1")
            const columns = [
                { field: "id", headerName: "#", width: 10 },
                { field: "tempo", headerName: "Tempo(ms)", width: 110 },
                { field: "temperatura", headerName: "Temperatura(C)", width: 140 },
                { field: "umidade", headerName: "Umidade(%)", width: 115 },
                { field: "pressao", headerName: "Pressão(Pa)", width: 115 },
                { field: "co2", headerName: "Co2(ppm)", width: 100 },
                { field: "luminosidade", headerName: "Luminosidade(%)", width: 150 },
                { field: "acelx", headerName: "AcelX(m/s²)", width: 115 },
                { field: "acely", headerName: "AcelY(m/s²)", width: 115 },
                { field: "acelz", headerName: "AcelZ(m/s²)", width: 115 },
                { field: "girox", headerName: "GiroX(graus/s)", width: 135 },
                { field: "giroy", headerName: "GiroY(graus/s)", width: 135 },
                { field: "giroz", headerName: "GiroZ(graus/s)", width: 135 },
                { field: "magx", headerName: "MagX(uT)", width: 100 },
                { field: "magy", headerName: "MagY(uT)", width: 100 },
                { field: "magz", headerName: "MagZ(uT)", width: 100 },
                { field: "bateria", headerName: "Bateria(%)", width: 100 },
            ]

            var rows = []
            let counter = 0;

            data.map(item => {
                if (counter != 0 && counter != (data.length - 1)) {
                    rows.push(
                        {
                            id: counter,
                            tempo: item[0], 
                            temperatura: item[1], 
                            umidade: item[2], 
                            pressao: item[3],
                            co2: item[4],
                            luminosidade: item[5],
                            acelx: item[6],
                            acely: item[7],
                            acelz: item[8],
                            girox: item[9],
                            giroy: item[10],
                            giroz: item[11],
                            magx: item[12],
                            magy: item[13],
                            magz: item[14],
                            bateria: item[15]
                        }
                    )
                }
                counter++;
            });

            content =

            <div>

                <div style={{"width": "100%", "overflow": "auto"}}>

                    <div style={{"display": "flex", "width": "100%"}}>

                        <div style={{"width": "65%"}}>
                            <Typography style={DataTitleStyle}>{dataInfos.data_title}</Typography>
                            <Typography style={DataIdStyle}><b>Data ID: </b>{dataUid}</Typography>
                            <Typography style={DataDescStyle}><b>Data acquisition datetime: </b>{dataInfos.data_datetime}</Typography>
                        </div>

                        <div style={{"float": "right", "width": "35%"}}>

                            <ThemeProvider theme={LoginButtonTheme}>
                                <Link style={{"cursor": "pointer", "textDecoration": "none", "color": "var(--white)"}} to="/datacharts">
                                    <Button color="primary" variant="contained" style={ChartsButtonStyle}>Data Charts</Button>
                                </Link>
                            </ThemeProvider>

                            <Typography style={ChartsDescStyle}>
                                Na página 
                                <Link style={{"cursor": "pointer", "textDecoration": "none", "color": "var(--white)"}} to="/datacharts">
                                    <b style={{"fontSize": "0.8rem"}}> Data Charts </b> 
                                </Link>
                                você pode selecionar dados para processar em formato de gráficos.
                            </Typography>

                        </div>
                        
                    </div>

                </div>

                <div style={{height: "85vh"}}>

                <DataGrid 
                    rows={rows}
                    columns={columns}
                    className={classes.root}
                />

                </div>

            </div>

        }
        else {
            content = <div></div>
        }

        return (
            <div>
                {content}
            </div>
        )

    }

}

DataTable.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DataTable);