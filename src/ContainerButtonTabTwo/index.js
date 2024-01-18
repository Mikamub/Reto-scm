import React, { useState} from 'react';
import { SelectTabTwo } from './selectTabTwo/selectTabTwo';
import './containerButtonTwo.css'; 

function ContainerButtonTabTwo ({onSelectValuesTwo}) {
    const [selectedValues, setSelectedValues] = useState({ tienda: '', periodo: '' });

    const handleSelectTienda = (tienda) => {
        setSelectedValues((prevValues) => ({ ...prevValues, tienda }));
    };

    const handleSelectPeriodo = (periodo) => {
        setSelectedValues((prevValues) => ({ ...prevValues, periodo }));
    };

    const handleSubmit = () => {
        console.log('Valores seleccionados:', selectedValues);
        onSelectValuesTwo(selectedValues);
    };

    return (
        <div className='container-button-two'>
            <div className='container-button-select-two'>
                <SelectTabTwo onSelectTienda={handleSelectTienda} onSelectPeriodo={handleSelectPeriodo} />
            </div>
            <div className='container-button-action-two'>
                <button className='submitButton-two' onClick={handleSubmit}>
                    Aplicar
                </button>
            </div>
        </div>
    );
}

export { ContainerButtonTabTwo };