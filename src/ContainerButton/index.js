import './containerButton.css'; 
import { SelectButton } from './selectButton';

function ContainerButton(){

    return (
        <div className='container-button'>
            <div className='container-button-select'>
            <SelectButton />
                <SelectButton/>
                <SelectButton/>
            </div>
            <div className= 'container-button-action'>            
                <button className='submitButton'>Aplicar</button>
                <button className='clearButton'> Limpiar</button>
            </div>
        </div>
    );
}

export { ContainerButton};