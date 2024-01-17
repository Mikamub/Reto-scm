import './selectButton.css'; 
import React, { useState,useEffect } from 'react';
import Papa from 'papaparse';
import data from '../../Data/test_contrato_monthly.csv';

function SelectTabOne( {onSelectTienda, onSelectPeriodo, onSelectCargo}) {
    const [nameOptionsTienda, setNameOptionsTienda] = useState([]);
    const [nameOptionPeriodo, setNameOptionsPeriodo] = useState([]);
    const [nameOptionsCargo, setNameOptionsCargo] = useState([]);
    const [selectedTienda, setSelectedTienda] = useState('');
    const [selectedPeriodo, setSelectedPeriodo] = useState('');
    const [selectedCargo, setSelectedCargo] = useState('');

    useEffect(() => {
        Papa.parse(data, {
            header: true,
            download: true,
            dynamicTyping: true,
            delimiter: ',',
            complete: (result) => {
                const uniqueNamesTiendas = [...new Set(result.data.map(item => item.tienda))];
                const uniqueNamesPeriodo = [...new Set(result.data.map(item => item.mes))];
                const uniqueNamesCargo = [...new Set(result.data.map(item => item.nombre))];
                
                setNameOptionsTienda(['Todos', ...uniqueNamesTiendas]);
                setNameOptionsPeriodo(['Todos', ...uniqueNamesPeriodo]);
                setNameOptionsCargo(['Todos', ...uniqueNamesCargo]);
            },
        });
    }, [])

        const handleTiendaChange = (event) => {
            setSelectedTienda(event.target.value);
            onSelectTienda(event.target.value);
        };
    
        const handlePeriodoChange = (event) => {
            setSelectedPeriodo(event.target.value);
            onSelectPeriodo(event.target.value);
        };

        const handleCargoChange = (event) => {
            setSelectedCargo(event.target.value);
            onSelectCargo(event.target.value);
        };
        
    return (
        <>
            <select className="select-button" name="opciones" onChange={handleTiendaChange} value={selectedTienda}>
                {nameOptionsTienda.map((name, index) => (
                    <option key={index}> Tienda: {name}</option>

                ))}
            </select>
            <select className="select-button" name="opciones" onChange={handlePeriodoChange} value={selectedPeriodo}>
                {nameOptionPeriodo.map((name, index) => (
                    <option key={index}> Mes : {name}</option>
                ))}
            </select>
            <select className="select-button" name="opciones" onChange={handleCargoChange} value={selectedCargo}>
                {nameOptionsCargo.map((name, index) => (
                    <option key={index}>Cargo : {name}</option>
                ))}
            </select>
        </>
    );
}

export { SelectTabOne };


