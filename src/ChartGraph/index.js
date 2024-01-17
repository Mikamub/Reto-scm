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

const ChartComponent = () => {
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
                const tiendas = [];
                const contratadosSpSum = {};

                result.data.forEach((item) => {
                    const tienda = `Tienda ${item['tienda']}`;
                    const contratadosSp = item['contratados_sp'];

                    if (!tiendas.includes(tienda)) {
                        tiendas.push(tienda);
                        contratadosSpSum[tienda] = 0;
                    }

                    contratadosSpSum[tienda] += contratadosSp;
                });

                setChartData({
                    labels: tiendas,
                    datasets: [
                        {
                            label: "Contratados SP",
                            data: tiendas.map((tienda) => contratadosSpSum[tienda]),
                            borderColor: "black",
                            backgroundColor: "blue",
                        },
                    ],
                });

                setChartOptions({
                    responsive: true,
                    plugins: {
                        legend: {
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
    }, []);

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

export default ChartComponent;
