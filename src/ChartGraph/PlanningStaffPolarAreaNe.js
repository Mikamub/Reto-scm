import React, { useEffect, useState } from 'react';
import './chartGraph.css';
import Data from '../Data/test_contrato_monthly.csv';
import {PolarArea } from 'react-chartjs-2';
import Papa from 'papaparse';
import { Chart } from 'chart.js';



import { CategoryScale, RadialLinearScale, ArcElement, BarElement, Legend, Tooltip } from 'chart.js';

Chart.register(
    CategoryScale,
    RadialLinearScale,
    ArcElement,
    BarElement,
    Legend,
    Tooltip
);

function PlaningStaffPolarAreaNe({ selectedValues }){ //props con valores de los selects
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
                let filteredData = result.data;
                let cargosSp = [];
                let cargosNe = [];
                let sumCargosSp = 0;
                let sumCargosNe = 0;

                // Filtrado de datos según los valores seleccionados
                if (selectedValues.tienda !== '' && selectedValues.tienda !== 'Todos') {
                    const tiendaNumber = parseInt(selectedValues.tienda.match(/\d+/)[0], 10);
                    filteredData = filteredData.filter(item => item['tienda'] === tiendaNumber);
                }
                if (selectedValues.periodo !== '' && selectedValues.periodo !== 'Todos' && selectedValues.periodo) {
                    const periodoNumber = parseInt(selectedValues.periodo.match(/\d+/)[0], 10);
                    filteredData = filteredData.filter(item => item['mes'] === periodoNumber);
                }

                const uniqueMesesSet = new Set(filteredData.map(item => `Mes ${item.mes}`));
                const dataMeses = [...uniqueMesesSet];

                const cargos = new Set(filteredData.map(item => item['nombre']));

                cargos.forEach((cargo) => {
                    filteredData.forEach((item) => {
                        if (cargo === item['nombre']) {
                            sumCargosSp += item['contratados_sp'];
                            sumCargosNe += item['contratados_ne'];
                        }
                    });
                    cargosSp.push(sumCargosSp);
                    cargosNe.push(sumCargosNe);
                    sumCargosSp = 0;
                    sumCargosNe = 0;
                });
                console.log(cargosSp);
                console.log(cargos);

                setChartData({
                    labels: [...cargos],
                    datasets: [{
                        label: 'Cargos NE contratados',
                        data: cargosNe,
                        backgroundColor: [
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(250, 78, 161, 0.2)',
                        ],
                        borderColor:  [
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(250, 78, 161, 1)',
                        ],
                        borderWidth: 2
                    },
                    ]
                });

                setChartOptions({
                    scales: {
                        r: {
                            type: 'radialLinear',
                            display: false,
                        }
                    },
                    plugins: {
                        legend: {
                            display:  true,
                            position: 'top', // Puedes ajustar la posición a 'top', 'bottom', 'left', 'right'
                            labels: {
                                boxWidth: 8, // Ajusta el ancho del cuadro de la leyenda
                                font: {
                                    size: 9, // Ajusta el tamaño de la fuente de la leyenda
                                },
                            },
                        },
                    },
                });
            },
        });
    }, [selectedValues]);

    return (
        <div className='graphPolar'>
                        <p>Contratos Reales</p>
            <PolarArea data={chartData} options={chartOptions} />
        </div>);
};

export {PlaningStaffPolarAreaNe};
