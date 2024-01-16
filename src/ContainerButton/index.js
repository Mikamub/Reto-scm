import './containerButton.css'; 
import { SelectButton } from './selectButton';
import {SubmitButton} from './submitButton';
import {ClearButton} from './clearButton';

function ContainerButton(){
    return (
        <div className='container-button'>
            <SelectButton/>
            <SelectButton/>
            <SelectButton/>
            <SubmitButton/>
            <ClearButton/>
        </div>


    );
}

export { ContainerButton};