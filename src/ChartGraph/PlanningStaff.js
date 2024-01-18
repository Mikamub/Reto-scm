import React, { useEffect, useState } from 'react';
import './chartGraph.css';
import Data from '../Data/test_contrato_monthly.csv';
import { Bar } from 'react-chartjs-2';
import Papa from 'papaparse';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Legend
);

function PlaningStaff({ selectedValues }){
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        Papa.parse(Data, {
            download: true,
            header: true,
            dynamicTyping: true,
            delimiter: "",
            complete: (result) => {
                let contratadosSpSum = 0;
                let contratadosNeSum = 0;
                //console.log(result.data);
                let filteredData = result.data;
                //console.log(selectedValues)

                if (selectedValues.tienda !== '' && selectedValues.tienda !=='Tienda: Todos') {
                    const tiendaNumber = parseInt(selectedValues.tienda.match(/\d+/)[0], 10);
                    //console.log(tiendaNumber)
                    filteredData = filteredData.filter(item => item['tienda'] === tiendaNumber);
                    //console.log(filteredData)
                }
                if (selectedValues.periodo !== ''&& selectedValues.periodo !=='Mes : Todos') {
                    const periodoNumber = parseInt(selectedValues.periodo.match(/\d+/)[0], 10);
                    //console.log(periodoNumber)
                    filteredData = filteredData.filter(item => item['mes'] === periodoNumber);
                    //console.log(filteredData)
                }
                if (selectedValues.cargo !== ''&& selectedValues.cargo !=='Cargo : Todos') {
                    //console.log(selectedValues.cargo)
                    const parts = selectedValues.cargo.split(': ');
                    const cargo = parts[1] ? parts[1].trim() : '';
                    filteredData = filteredData.filter(item => item['nombre'] === cargo);
                    //console.log(filteredData)
                }
                console.log(filteredData)

                filteredData.forEach((item) => {
                    const contratadosSp = item['contratados_sp'];
                    const contratadosNe = item['contratados_ne'];

                    contratadosSpSum += contratadosSp;
                    contratadosNeSum += contratadosNe
                });
                console.log(contratadosSpSum)
                console.log(contratadosNeSum)
                if (contratadosNeSum > contratadosSpSum) {
                    console.log("Despedir") 
                    console.log(contratadosNeSum-contratadosSpSum)
                }
                if (contratadosSpSum > contratadosNeSum) { 
                    console.log("Contratar")
                    console.log(contratadosSpSum-contratadosNeSum)
                }

                setChartData({
                    labels: ['Contratos Reales','Contratos StaffPlanning' ],
                    datasets: [
                    {
                        
                    data: [contratadosNeSum,contratadosSpSum],
                    borderColor: ["black","black"],
                    backgroundColor: ["#446FF2","#8DAEF2"],
                    },
                    ],
                });
                

                setChartOptions({
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: "Overview",
                        },
                    },
                });
            },
        });
    }, [selectedValues]);

    //console.log(selectedValues);
    

    return (
        chartData.datasets.length > 0 ? (
            <div className='container-graph'>
                <Bar className='graph' options={chartOptions} data={chartData} />
            </div>
        ) : (
            <div> Cargando ... </div>
        )
    );
};

export {PlaningStaff};
