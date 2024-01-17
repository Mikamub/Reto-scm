import './selectButton.css'; 
import React, { useState,useEffect } from 'react';

function SelectTabOne({ options }) {
    const [nameOptions, setNameOptions] = useState([]);

    useEffect(() => {
        if (options && options.data) {
            const uniqueNames = [...new Set(options.data.map(item => item.tienda))];
            setNameOptions(uniqueNames);
        }
    }, [options]);

    return (
        <>
            <select className="select-button" name="opciones">
                {nameOptions.map((name, index) => (
                    <option key={index}>{name}</option>
                ))}
            </select>
            <select className="select-button" name="opciones">
                {nameOptions.map((name, index) => (
                    <option key={index}>{name}</option>
                ))}
            </select>
            <select className="select-button" name="opciones">
                {nameOptions.map((name, index) => (
                    <option key={index}>{name}</option>
                ))}
            </select>
        </>
    );
}

export { SelectTabOne };


