import React, { useEffect, useState } from 'react';
import './chartGraph.css';
import Data from '../Data/test_output_planning_monthly.csv';
import { Bar } from 'react-chartjs-2';
import Papa from 'papaparse';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Legend, ChartDataLabels);

function Estadisticas({ selectedValues }) {
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

        if (selectedValues.tienda !== '' && selectedValues.tienda !== 'Todos') {
            const tiendaNumber = parseInt(selectedValues.tienda.match(/\d+/)[0], 10);
            filteredData = filteredData.filter(item => item['tienda'] === tiendaNumber);
        }
        if (selectedValues.periodo !== '' && selectedValues.periodo !== 'Todos') {
            const periodoNumber = parseInt(selectedValues.periodo.match(/\d+/)[0], 10);
            filteredData = filteredData.filter(item => item['mes'] === periodoNumber);
        }

        const uniqueMesesSet = new Set(filteredData.map(item => `Mes ${item.mes}`));
        const dataMeses = [...uniqueMesesSet];

        setChartData({
            labels: dataMeses,
            datasets: [
            {
                label: 'Tienda 1',
                data: filteredData
                .filter(item => item.tienda === 1)
                .map(item => (item.cobertura_media * 100)),
                borderColor: "rgba(68,111,242,1)",
                backgroundColor: "rgba(68,111,242,0.8)",
                borderWidth: 2,
                fill: false,
                pointRadius: 5,
                pointHoverRadius: 8,
            },
            {
                label: 'Tienda 2',
                data: filteredData
                .filter(item => item.tienda === 2)
                .map(item => (item.cobertura_media * 100)),
                borderColor: "rgba(141,174,242,1)",
                backgroundColor: "rgba(141,174,242,0.8)",
                borderWidth: 2,
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
                formatter: (value) => {
                return value.toFixed(2) + '%';
                },
            },
            },
            scales: {
            x: {
                title: {
                display: true,
                },
                ticks: {
                autoSkip: false,
                },
            },
            y: {
                min:0,
                max:100,
                type: 'linear',
                title: {
                display: true,
                text: 'Cobertura Media (%)',
                },
                ticks: {
                callback: (value) => {
                    return value + '%';
                },
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
}

export { Estadisticas };