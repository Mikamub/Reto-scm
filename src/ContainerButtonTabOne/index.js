import React, { useState} from 'react';
import { SelectTabOne } from './selectTabOne/selectTabOne';
import './containerButton.css'; 

function ContainerButtonTabOne({onSelectValuesOne}) { //props para manejar las opciones del select
    const [selectedValuesOne, setSelectedValuesOne] = useState({ tienda: '', periodo: '', cargo: '' });

    const handleSelectTienda = (tienda) => {
        setSelectedValuesOne((prevValues) => ({ ...prevValues, tienda }));
    };

    const handleSelectPeriodo = (periodo) => {
        setSelectedValuesOne((prevValues) => ({ ...prevValues, periodo }));
    };

    const handleSelectCargo = (cargo) => {
        setSelectedValuesOne((prevValues) => ({ ...prevValues, cargo }));
    };

    const handleSubmit = () => {
        console.log('Valores seleccionados:', selectedValuesOne);
        onSelectValuesOne(selectedValuesOne);
        };

    return (
    <div className='container-button'>
        <div className='container-button-select'>
        <SelectTabOne onSelectTienda={handleSelectTienda} onSelectPeriodo={handleSelectPeriodo} onSelectCargo={handleSelectCargo}/>
        </div>
        <div className='container-button-action'>
        <button className='submitButton' onClick={handleSubmit}>
            Aplicar
        </button>
        </div>
    </div>
    );
}

export  {ContainerButtonTabOne};