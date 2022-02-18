import { React, Component, Container, useState, useEffect, useLayoutEffect, componentDidMount } from "react";
import { DataGrid } from '@mui/x-data-grid';

class DataTable extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const data = this.props.data;
        console.log("data length: "+data.length)
        console.log(data);

        let content;

        if (data.length >= 1) {
            console.log("if >= 1")

            const columns = [
                { field: "id", headerName: "#", width: 10 },
                { field: "tempo", headerName: "Tempo(ms)", width: 70 },
                { field: "temperatura", headerName: "Temperatura(C)", width: 70 },
                { field: "umidade", headerName: "Umidade(%)", width: 70 },
                { field: "pressao", headerName: "Pressão(Pa)", width: 70 },
                { field: "co2", headerName: "Co2(ppm)", width: 70 },
                { field: "luminosidade", headerName: "Luminosidade(%)", width: 70 },
                { field: "acelx", headerName: "AcelX(m/s²)", width: 70 },
                { field: "acely", headerName: "AcelY(m/s²)", width: 70 },
                { field: "acelz", headerName: "AcelZ(m/s²)", width: 70 },
                { field: "girox", headerName: "GiroX(graus/s)", width: 70 },
                { field: "giroy", headerName: "GiroY(graus/s)", width: 70 },
                { field: "giroz", headerName: "GiroZ(graus/s)", width: 70 },
                { field: "magx", headerName: "MagX(uT)", width: 70 },
                { field: "magy", headerName: "MagY(uT)", width: 70 },
                { field: "magz", headerName: "MagZ(uT)", width: 70 },
                { field: "bateria", headerName: "Bateria(%)", width: 70 },
            ]

            var rows = []
            let counter = 0;

            data.map(item => {
                //console.log("map: "+item[1])
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

            console.log("rows: "+rows[1].temperatura)

            content = 

            <div style={{height: 700}}>

                <DataGrid 
                    rows={rows}
                    columns={columns}
                    style={{"color": "white", "fontSize": "0.5rem"}}
                />
                
            </div>
        }
        else {
            content = <table></table>
        }

        return (
            <div>
                {content}
            </div>
        )

    }

}

export default DataTable;