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

function Estadisticas({ selectedValues }){ //props del valor que se cliqueo en los selects de la pestaña dos
    const [chartData, setChartData] = useState({  //Ejes y datos del grafico
        labels: [],
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({}); //opciones para configurar el chart

    useEffect(() => {
        Papa.parse(Data, {
            download: true,
            header: true,
            dynamicTyping: true,
            delimiter: "",
            complete: (result) => { // Se ejecuta después de analizar el archivo CSV con PapaParse
                
                let filteredData = result.data; // Filtrar datos según los valores seleccionados en los selects

                if (selectedValues.tienda !== '' && selectedValues.tienda !=='Todos') {
                    const tiendaNumber = parseInt(selectedValues.tienda.match(/\d+/)[0], 10);
                    filteredData = filteredData.filter(item => item['tienda'] === tiendaNumber);
                }
                if (selectedValues.periodo !== ''&& selectedValues.periodo !=='Todos') {
                    const periodoNumber = parseInt(selectedValues.periodo.match(/\d+/)[0], 10);
                    filteredData = filteredData.filter(item => item['mes'] === periodoNumber);
                }
        
                const dataCobertura = filteredData.map(item => item.cobertura_media) // Extracción de datos para el gráfico
                const dataMeses = filteredData.map(item => item.mes);

                // Actualizar el estado del gráfico con los datos filtrados
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

                // Configurar opciones del gráfico
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
                            title: {
                                display: true,
                                text: 'Meses',
                            },
                        },
                        y: {
                            type: 'linear', 
                            title: {
                                display: true,
                                text: 'Cobertura Media',
                            },
                        },
                    },
                });
            },
        });
    }, [selectedValues]);

    return (
        // Renderizar el componente de gráfico de barras si hay datos disponibles
        chartData.datasets.length > 0 ? (
            <div className='container-graph'>
                <Bar className='graph' options={chartOptions} data={chartData} />
            </div>
        ) : (
            // Mostrar "Cargando..." si no hay datos disponibles
            <div> Cargando ... </div>
        )
    );
};

export {Estadisticas};
