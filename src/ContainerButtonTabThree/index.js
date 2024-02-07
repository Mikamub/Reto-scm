import React, { useState} from 'react';
import { SelectTabThree } from './selectTabThree/selectTabThree';
import './containerButtonThree.css'; 

function ContainerButtonTabThree ({onSelectValuesThree}) {
    const [selectedValues, setSelectedValues] = useState({ tienda: '', periodo: '' });

    const handleSelectTienda = (tienda) => {
        setSelectedValues((prevValues) => ({ ...prevValues, tienda }));
    };

    const handleSelectPeriodo = (periodo) => {
        setSelectedValues((prevValues) => ({ ...prevValues, periodo }));
    };

    const handleSubmit = () => {
        console.log('Valores seleccionados:', selectedValues);
        onSelectValuesThree(selectedValues);
    };

    return (
        <div className='container-button-three'>
            <div className='container-button-select-three'>
                <SelectTabThree onSelectTienda={handleSelectTienda} onSelectPeriodo={handleSelectPeriodo} />
            </div>
            <div className='container-button-action-three'>
                <button className='submitButton-three' onClick={handleSubmit}>
                    Aplicar
                </button>
            </div>
        </div>
    );
}

export { ContainerButtonTabThree };