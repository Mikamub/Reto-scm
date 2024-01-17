import './containerButton.css'; 
import React, { useState } from 'react';
import { SelectButton } from './selectButton';

function ContainerButton(){
    const [selectValues, setSelectValues] = useState(['', '', '']);
    const handleSubmit = () => {
      // Aquí puedes hacer algo con la información seleccionada, por ejemplo, enviarla a un servidor
    console.log('Valores seleccionados:', selectValues);
    };

    // Función para manejar el clic en el botón "Limpiar"
    const handleClear = () => {
      // Limpiar la información de los selects
    console.log('funcionaaa');
    setSelectValues(['', '', '']);
    };

    return (
        <div className='container-button'>
            <div className='container-button-select'>
            <SelectButton />
                <SelectButton/>
                <SelectButton/>
            </div>
            <div className= 'container-button-action'>            
            <button className='submitButton' onClick={handleSubmit}>Aplicar</button>
        <button className='clearButton' onClick={handleClear}>Limpiar</button>
            </div>
        </div>
    );
}

export { ContainerButton};

    // const handleSelectChange = (index, value) => {
    // const newSelectValues = [...selectValues];
    // newSelectValues[index] = value;
    // setSelectValues(newSelectValues);
    // };
