import './selectButtonThree.css'; 
import React, { useState,useEffect } from 'react';
import Papa from 'papaparse';
import data from '../../Data/test_output_planning_monthly.csv';

function SelectTabThree({ onSelectTienda, onSelectPeriodo }) {
    const [nameOptionsTienda, setNameOptionsTienda] = useState([]);
    const [nameOptionsPeriodo, setNameOptionsPeriodo] = useState([]);
    const [selectedTienda, setSelectedTienda] = useState('');
    const [selectedPeriodo, setSelectedPeriodo] = useState('');

    useEffect(() => {
        Papa.parse(data, {
            header: true,
            download: true,
            dynamicTyping: true,
            delimiter: ',',
            complete: (result) => {
                const uniqueNamesTiendas = [...new Set(result.data.map(item => item.tienda))];
                const uniqueNamesPeriodo = [...new Set(result.data.map(item => item.mes))];
                setNameOptionsTienda(['Todos', ...uniqueNamesTiendas]);
                setNameOptionsPeriodo(['Todos', ...uniqueNamesPeriodo]);
            },
        });
    }, []);

    const handleTiendaChange = (event) => {
        setSelectedTienda(event.target.value);
        onSelectTienda(event.target.value);
    };

    const handlePeriodoChange = (event) => {
        setSelectedPeriodo(event.target.value);
        onSelectPeriodo(event.target.value);
    };

    return (
        <>
            <select className="select-button-three" name="opciones" onChange={handleTiendaChange} value={selectedTienda}>
                {nameOptionsTienda.map((name, index) => (
                    <option key={index} value={name}>Tienda: {name}</option>
                ))}
            </select>
            <select className="select-button-three" name="opciones" onChange={handlePeriodoChange} value={selectedPeriodo}>
                {nameOptionsPeriodo.map((name, index) => (
                    <option key={index} value={name}> Mes: {name}</option>
                ))}
            </select>
        </>
    );
}

export { SelectTabThree };