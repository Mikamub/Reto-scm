import React, { useEffect, useState } from 'react';
import './chartGraph.css';
import Data from '../Data/test_output_planning_monthly.csv';
import { Bar } from 'react-chartjs-2';
import Papa from 'papaparse';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Legend
);

function Estadisticas({ selectedValues }){
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
                
                //console.log(result.data);
                let filteredData = result.data;
                console.log(selectedValues)

                if (selectedValues.tienda !== '' && selectedValues.tienda !=='Todos') {
                    const tiendaNumber = parseInt(selectedValues.tienda.match(/\d+/)[0], 10);
                    console.log(tiendaNumber)
                    filteredData = filteredData.filter(item => item['tienda'] === tiendaNumber);
                    //console.log(filteredData)
                }
                if (selectedValues.periodo !== ''&& selectedValues.periodo !=='Todos') {
                    const periodoNumber = parseInt(selectedValues.periodo.match(/\d+/)[0], 10);
                    //console.log(periodoNumber)
                    filteredData = filteredData.filter(item => item['mes'] === periodoNumber);
                    //console.log(filteredData)
                }
                console.log(filteredData['cobertura_media'])
        
                const dataCobertura = filteredData.map(item => item.cobertura_media)
                console.log(dataCobertura)
                
                const dataMeses = filteredData.map(item => item.mes);
                console.log(dataMeses)

                setChartData({
                    labels: dataMeses,
                    datasets: [
                        {
                            label: 'Cobertura Media',
                            data: dataCobertura,
                            borderColor: 'black',
                            backgroundColor: '#8DAEF2',
                            fill: false,
                            pointRadius: 5,
                        pointHoverRadius: 8,
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
                    scales: {
                        x: {
                            type: 'linear', 
                            position: 'bottom',
                            ticks: {
                                precision: 0, 
                            },
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

export {Estadisticas};
