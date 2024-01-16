import './containerButton.css'; 
import { SelectButton } from './selectButton';
import {SubmitButton} from './submitButton';
import {ClearButton} from './clearButton';

function ContainerButton(){
    return (
        <div className='container-button'>
            <div className='container-button-select'>
                <SelectButton/>
                <SelectButton/>
                <SelectButton/>
            </div>
            <div className= 'container-button-action'>            
                <SubmitButton/>
                <ClearButton/>
            </div>
        </div>
    );
}

export { ContainerButton};