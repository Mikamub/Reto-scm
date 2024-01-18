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

function PlaningStaff({ selectedValues }){ //props con valores de los selects
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
                let filteredData = result.data;

                // Filtrado de datos según los valores seleccionados
                if (selectedValues.tienda !== '' && selectedValues.tienda !=='Tienda: Todos') {
                    const tiendaNumber = parseInt(selectedValues.tienda.match(/\d+/)[0], 10);
                    filteredData = filteredData.filter(item => item['tienda'] === tiendaNumber);
                }
                if (selectedValues.periodo !== ''&& selectedValues.periodo !=='Mes : Todos') {
                    const periodoNumber = parseInt(selectedValues.periodo.match(/\d+/)[0], 10);
                    filteredData = filteredData.filter(item => item['mes'] === periodoNumber);
                }
                if (selectedValues.cargo !== ''&& selectedValues.cargo !=='Cargo : Todos') {
                    const parts = selectedValues.cargo.split(': ');
                    const cargo = parts[1] ? parts[1].trim() : '';
                    filteredData = filteredData.filter(item => item['nombre'] === cargo);
                }
                // Operaciones con los datos filtrados
                filteredData.forEach((item) => {
                    const contratadosSp = item['contratados_sp'];
                    const contratadosNe = item['contratados_ne'];
                    contratadosSpSum += contratadosSp;
                    contratadosNeSum += contratadosNe
                });
                // Configuración de datos para el gráfico
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
                // Configuración de opciones para el gráfico
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
                    
                });
            },
        });
    }, [selectedValues]);

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
