import { React, Component } from "react";
import { Link } from "react-router-dom";

import { Button, Container, Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

class DataChart extends Component {

    constructor(props) {
        super(props);
    }

    render () {

        ChartJS.register(
            CategoryScale,
            LinearScale,
            PointElement,
            LineElement,
            Title,
            Tooltip,
            Legend
        );

        ChartJS.defaults.color = "#F8F8F8";

        const data = this.props.data;
        const dataUid = this.props.dataUid;
        const dataInfos = this.props.dataInfos;

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

        if (data.length >= 1) {

            console.log("if >= 1");

            let labels = [];
            let temperatura = [];
            let umidade = [];
            let pressao = [];
            let co2 = [];
            let luminosidade = [];
            let acelx = [];
            let acely = [];
            let acelz = [];
            let girox = [];
            let giroy = [];
            let giroz = [];
            let magx = [];
            let magy = [];
            let magz = [];
            let bateria = [];
            let counter = 0;

            data.map(item => {
                if (counter != 0 && counter != (data.length - 1)) {
                    labels.push(
                        item[0] + "ms"
                    );
                    temperatura.push(
                        item[1]
                    );
                    umidade.push(
                        item[2]
                    );
                    pressao.push(
                        item[3]
                    );
                    co2.push(
                        item[4]
                    );
                    luminosidade.push(
                        item[5]
                    );
                    acelx.push(
                        item[6]
                    );
                    acely.push(
                        item[7]
                    );
                    acelz.push(
                        item[8]
                    );
                    girox.push(
                        item[9]
                    );
                    giroy.push(
                        item[10]
                    );
                    giroz.push(
                        item[11]
                    );
                    magx.push(
                        item[12]
                    );
                    magy.push(
                        item[13]
                    );
                    magz.push(
                        item[14]
                    );
                    bateria.push(
                        item[15]
                    );
                }
                counter++;
            });

            const chartData = {
                labels: labels,
                datasets: [
                    {
                        label: "Temperatura °C",
                        data: temperatura,
                        backgroundColor: "#00D8FF",
                        borderColor: "#00D8FF"
                    },
                    {
                        label: "Umidade %",
                        data: umidade,
                        backgroundColor: "#1a73e8",
                        borderColor: "#1a73e8"
                    },
                    {
                        label: "Pressão Pa",
                        data: pressao,
                        backgroundColor: "#3f51b5",
                        borderColor: "#3f51b5",
                        hidden: true
                    }, 
                    {
                        label: "CO2 ppm",
                        data: co2,
                        backgroundColor: "#FF0000",
                        borderColor: "#FF0000",
                        hidden: true
                    },
                    {
                        label: "Luminosidade UV %",
                        data: luminosidade,
                        backgroundColor: "#F8F8F8",
                        borderColor: "#F8F8F8",
                    },
                    {
                        label: "Acelerômetro X",
                        data: acelx,
                        backgroundColor: "#CBCDE5",
                        borderColor: "#CBCDE5",
                        hidden: true
                    },
                    {
                        label: "Acelerômetro Y",
                        data: acely,
                        backgroundColor: "#CDC1CF",
                        borderColor: "#CDC1CF",
                        hidden: true
                    },
                    {
                        label: "Acelerômetro Z",
                        data: acelz,
                        backgroundColor: "#CFB7B9",
                        borderColor: "#CFB7B9",
                        hidden: true
                    },
                    {
                        label: "Giroscópio X",
                        data: girox,
                        backgroundColor: "#3B3343",
                        borderColor: "#3B3343",
                        hidden: true
                    },
                    {
                        label: "Giroscópio Y",
                        data: giroy,
                        backgroundColor: "#695685",
                        borderColor: "#695685",
                        hidden: true
                    },
                    {
                        label: "Giroscópio Z",
                        data: giroz,
                        backgroundColor: "#9A86B8",
                        borderColor: "#9A86B8",
                        hidden: true
                    },
                    {
                        label: "Magnetômetro X",
                        data: magx,
                        backgroundColor: "#FF8800",
                        borderColor: "#FF8800",
                        hidden: true
                    },
                    {
                        label: "Magnetômetro Y",
                        data: magy,
                        backgroundColor: "#FFC800",
                        borderColor: "#FFC800",
                        hidden: true
                    },
                    {
                        label: "Magnetômetro Z",
                        data: magz,
                        backgroundColor: "#ffef88",
                        borderColor: "#ffef88",
                        hidden: true
                    },
                    {
                        label: "Bateria %",
                        data: bateria,
                        backgroundColor: "#30B72D",
                        borderColor: "#30B72D",
                        hidden: true
                    }
                ]
            };

            const options = {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
                responsive: true,
                maintainAspectRatio: false,

            };

            content =

            <div>

                <div style={{"width": "100%", "overflow": "auto"}}>

                    <div style={{"display": "flex", "width": "100%"}}>

                        <div style={{"width": "100%"}}>
                            <Typography style={DataTitleStyle}>{dataInfos.data_title}</Typography>
                            <Typography style={DataIdStyle}><b>Data ID: </b>{dataUid}</Typography>
                            <Typography style={DataDescStyle}><b>Data acquisition datetime: </b>{dataInfos.data_datetime}</Typography>
                        </div>
                        
                    </div>

                </div>

                <div style={{"width": "100%"}}>

                    <Container style={{height: "95vh"}} maxwidth="lg" align="center">
                        <div className="canvas-container" style={{height: "85vh", width: "100%"}}>
                            <Line data={chartData} options={options} />
                        </div>
                    </Container>
                    
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

export default DataChart;