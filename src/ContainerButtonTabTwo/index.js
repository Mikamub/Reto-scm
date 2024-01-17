import React, { useState} from 'react';
import { SelectTabTwo } from './selectTabTwo/selectTabTwo';
import './containerButton.css'; 

function ContainerButtonTabTwo() {
    const [selectedValues, setSelectedValues] = useState({ tienda: '', periodo: '' });

    const handleSelectTienda = (tienda) => {
        setSelectedValues((prevValues) => ({ ...prevValues, tienda }));
    };

    const handleSelectPeriodo = (periodo) => {
        setSelectedValues((prevValues) => ({ ...prevValues, periodo }));
    };

    const handleSubmit = () => {
        console.log('Valores seleccionados:', selectedValues);
        // Aquí puedes enviar los valores a otro componente o realizar las acciones necesarias.
    };

    return (
        <div className='container-button'>
            <div className='container-button-select'>
                <SelectTabTwo onSelectTienda={handleSelectTienda} onSelectPeriodo={handleSelectPeriodo} />
            </div>
            <div className='container-button-action'>
                <button className='submitButton' onClick={handleSubmit}>
                    Aplicar
                </button>
            </div>
        </div>
    );
}

export { ContainerButtonTabTwo };