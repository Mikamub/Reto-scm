import './selectButton.css'; 

function SelectButton(){
    return (
            <select className="select-button" name="opciones">
                <option value="opcion1">Opción 1</option>
                <option value="opcion2">Opción 2</option>
                <option value="opcion3">Opción 3</option>
            </select>
    );
}

export { SelectButton};

// eslint-disable-next-line no-lone-blocks
{/* <label htmlFor="select">Selecciona una opción:</label>
<select id="select" value={selectedOption} onChange={handleSelectChange}>
    <option value="" disabled>
    Selecciona una opción
    </option>
        {options.map((option) => (
    <option key={option} value={option}>
        {option}
    </option>
    ))}
</select>
{selectedOption && <p>Seleccionado: {selectedOption}</p>} */}