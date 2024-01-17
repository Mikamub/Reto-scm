import './selectButton.css'; 
import React, { useEffect } from 'react';
import Papa from 'papaparse';
import data from '../../Data/test_contrato_monthly.csv';

function SelectButton() {

    useEffect(() => {

        // Lee el archivo CSV usando papaparse
        Papa.parse(data, {
        header: true,
        download: true,
        dynamicTyping: true,
        delimiter: ',',
        complete: (result) => {
            console.log(result);
        },
        });
        }, [])

    return (
    <>
        <select className="select-button" name="opciones">
            <option>
                option
            </option>
        </select>
    </>
    
    );
}

export { SelectButton };
