import React, { useState, useEffect } from 'react';
import { SelectTabOne } from './selectTabOne/selectTabOne';
import './containerButton.css'; 

function ContainerButtonTabOne({ activeTab }) {
    const [selectValues, setSelectValues] = useState(['', '', '']);

    const handleSubmit = () => {
    console.log('Valores seleccionados:', selectValues);
    };

    const handleClear = () => {
    console.log('funcionaaa');
    setSelectValues(['', '', '']);
    };

    return (
    <div className='container-button'>
        <div className='container-button-select'>
        <SelectTabOne/>
        </div>
        <div className='container-button-action'>
        <button className='submitButton' onClick={handleSubmit}>
            Aplicar
        </button>
        <button className='clearButton' onClick={handleClear}>
            Limpiar
        </button>
        </div>
    </div>
    );
}

export  {ContainerButtonTabOne};