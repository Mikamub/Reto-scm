import React, { useEffect, useState } from 'react';
import Data from '../Data/test_contrato_monthly.csv';
import { Bar } from 'react-chartjs-2';
import Papa from 'papaparse';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement,Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Legend
);

const ChartComponent = () => {
    const [chartData, setCharData] = useState({
        datasets: []
    });
    const [chartOptions, setCharOptions] = useState({});

    useEffect(() => {
        Papa.parse(Data, {
            download: true,
            header: true,
            dynamicTyping: true,
            delimiter: "",
            complete: ((result) => {
                console.log(result);
                setCharData({
                    labels: result.data.map((item, index) => [item[' "tienda"']]).filter(String), datasets: [
                        {
                            label: "Overview",
                            data: result.data.map((item, index)=> [item[' "contratados_sp"']]).filter(String), 
                            borderColor: "black",
                            backgroundColor: "blue",

                    }
                ]
            });
            setCharOptions({
                responsive: true, 
                plugins: {
                    legend:{
                        position: 'top' 
                    },
                    title:{
                        display: true, 
                        text: "Overview"
                    }
                }
            })
        })
    })
    }, []);

return (
    <div>
        {
        chartData.datasets.length > 0 ? (
            <div> <Bar options={chartOptions} data={chartData}/></div>
        ) : <div> Cargando ... </div>
}
    </div>
);
};

export default ChartComponent;