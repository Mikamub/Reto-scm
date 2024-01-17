import './header.css';
import imagenAnalytics from './grafico-de-barras.png'

function Header() {
    return (
        <div className='title'>
            <img className= 'logo' alt="logo de un grafico" src={imagenAnalytics}></img>
            <h1>Analytics</h1>
        </div>
    );
}

export {Header};