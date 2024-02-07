import React, { useEffect, useState } from 'react';
import './chartGraph.css';
import Data from '../Data/test_contrato_monthly.csv';
import { Bar} from 'react-chartjs-2';
import Papa from 'papaparse';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Legend, Tooltip } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Legend, 
    Tooltip
);

function PlaningStaffCargo({ selectedValues }){ //props con valores de los selects
    const [chartData, setChartData] = useState({ 
        labels: [],
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({});
    const [contratadosTotalesSpSum, setContratadosTotalesSpSum] = useState(0);
    const [contratadosTotalesNeSum, setContratadosTotalesNeSum] = useState(0);


    useEffect(() => {
        Papa.parse(Data, {
            download: true,
            header: true,
            dynamicTyping: true,
            delimiter: "",
            complete: (result) => {
                let contratadosSpSum = 0;
                let contratadosNeSum = 0;
                let filteredData = result.data;
                let mesesSp = [];
                let mesesNe = [];
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
                let sumContratadosTotalesSp = 0;
                let sumContratadosTotalesNe = 0;

                filteredData.forEach((item) => {
                    sumContratadosTotalesSp += item['contratados_sp'];
                    sumContratadosTotalesNe += item['contratados_ne'];
                });

                setContratadosTotalesSpSum(sumContratadosTotalesSp);
                setContratadosTotalesNeSum(sumContratadosTotalesNe);

                console.log(contratadosTotalesSpSum);
                console.log(contratadosTotalesNeSum);

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

                uniqueMesesSet.forEach((mes) => {
                    filteredData.forEach((item) => {
                        if (mes === `Mes ${item.mes}`) {
                            contratadosSpSum += item['contratados_sp'];
                            contratadosNeSum += item['contratados_ne'];
                        }
                    });
                    mesesSp.push(contratadosSpSum);
                    mesesNe.push(contratadosNeSum);
                    contratadosSpSum = 0;
                    contratadosNeSum = 0;
                });


                // Configuración de datos para el gráfico
                setChartData({
                    labels: dataMeses,
                    datasets: [
                    {
                        label: 'Contratos Reales',
                        data:mesesNe ,
                        borderColor: "rgba(68,111,242,1)",
                        backgroundColor: "rgba(68,111,242,0.8)",
                        borderWidth: 2,
                    },
                    {
                        label: 'Contratos StaffPlanning',
                        data: mesesSp,
                        borderColor: "rgba(141,174,242,1)",
                        backgroundColor: "rgba(141,174,242,0.8)",
                        borderWidth: 2,
                    },
                    ],
                });
                // Configuración de opciones para el gráfico
                setChartOptions({
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: "Overview",
                        },
                        datalabels: {
                            anchor: 'end',
                            align: 'end',
                        },
                    },
                    scales: {
                        x: {
                            position: 'bottom',
                            title: {
                                display: false,
                                text: 'Contratos',
                            },
                        },
                        y: {
                            
                            type: 'linear',
                            title: {
                                display: true,
                                text: 'Cantidad de Contratos',
                            },
                        },
                    },
                    tooltips: {
                        callbacks: {
                            label: function (context) {
                                // Mostrar el valor de la barra en el tooltip
                                return context.dataset.label + ': ' + context.formattedValue;
                            },
                        },
                    },
                });
            },
        });
    }, [selectedValues,contratadosTotalesSpSum, contratadosTotalesNeSum]);

    return (
        chartData.datasets.length > 0 ? (
            <div className='graphNew'>
                <section>
                <h2> {contratadosTotalesNeSum}</h2>
                <h2>{contratadosTotalesSpSum}</h2> 
                <h2>Totales Reales</h2>
                <h2>Totales SP</h2>
                
                </section>
                <Bar options={chartOptions} data={chartData} />
            </div>
        ) : (
            <div> Cargando ... </div>
        )
    );
};

export {PlaningStaffCargo};
