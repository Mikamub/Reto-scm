import React, { useState} from 'react';
import { SelectTabTwo } from './selectTabTwo/selectTabTwo';
import './containerButton.css'; 

function ContainerButtonTabTwo({ activeTab }) {
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
        <SelectTabTwo/>
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

export  {ContainerButtonTabTwo};