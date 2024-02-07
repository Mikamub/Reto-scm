import '../index.css'; 
import React, { useState } from 'react';
import { Header } from '../Header';
import { ContainerButtonTabOne } from '../ContainerButtonTabOne';
import { ContainerButtonTabTwo } from '../ContainerButtonTabTwo';
import { ContainerButtonTabThree } from '../ContainerButtonTabThree';
import {PlaningStaff} from '../ChartGraph/PlanningStaff';
import {PlaningStaffCargo} from '../ChartGraph/PlanningStaffCargo'
import { PlaningStaffPolarArea } from '../ChartGraph/PlanningStaffPolarArea';
import { PlaningStaffPolarAreaNe } from '../ChartGraph/PlanningStaffPolarAreaNe';
import { Estadisticas } from '../ChartGraph/Estadisticas';


function App() {
  const [activeTab, setActiveTab] = useState(3); //Estado de las pestañas
  const [selectedValuesOne, setSelectedValuesOne] = useState(  //Estado del value de los selects
    { 
      tienda: '', 
      periodo: '', 
      cargo: '' 
    });
  const [selectedValuesTwo, setSelectedValuesTwo] = useState(
      { 
        tienda: '', 
        periodo: '', 
    });
    const [selectedValuesThree, setSelectedValuesThree] = useState(
      { 
        tienda: '', 
        cargo: '' 
    });

  const handleTabChange = (tabNumber) => { //Manejo de las pestañas
    setActiveTab(tabNumber);
  };

  const handleSelectValuesOne = (values) => { //Manejo de los select de la pestaña uno
    setSelectedValuesOne(values);
  };

  const handleSelectValuesTwo = (values) => { //Manejo de los select de la pestaña dos
    setSelectedValuesTwo(values);
  };

  const handleSelectValuesThree = (values) => { //Manejo de los select de la pestaña dos
    setSelectedValuesThree(values);
  };

  //Componente Header, Botones de las pestañas y su respectivo evento de cambio de componentes
  return (
    <>
      <Header />
      <div className='tab-header'>
        <span className='container-tab'> 
        <button className={activeTab === 1 ? 'active-tab' : 'tab'}
            onClick={() => handleTabChange(1)}>Resultados Staff Planning</button> 
          <button className={activeTab === 2 ? 'active-tab' : 'tab'} 
            onClick={() => handleTabChange(2)}>Estadisticas</button>
          <button className={activeTab === 3 ? 'active-tab' : 'tab'} 
            onClick={() => handleTabChange(3)}>SP Cargo/mes</button>
          </span>
        </div>
        <div className={`container-chart${activeTab === 3 ? '-estadisticas-chart' : ''}`}>
        {activeTab === 1 && (
          <>
            <ContainerButtonTabOne onSelectValuesOne={handleSelectValuesOne} />
            <PlaningStaff selectedValues={selectedValuesOne} />
          </>
        )}
        {activeTab === 2 && (
          <>
            <ContainerButtonTabTwo onSelectValuesTwo={handleSelectValuesTwo}/>
            <Estadisticas selectedValues={selectedValuesTwo} />
          </>
        )}
          {activeTab === 3 && (
          <>
          <div className='tab-select'>
            <ContainerButtonTabThree onSelectValuesThree={handleSelectValuesThree}/>
          </div>
          <div className='container-graphCargo'>
            <div className='container-graphBar'>

              <PlaningStaffCargo selectedValues={selectedValuesThree} />
              </div>
            <div className='container-graphPolar'>
            <PlaningStaffPolarAreaNe selectedValues={selectedValuesThree} />
              <PlaningStaffPolarArea selectedValues={selectedValuesThree} />

            </div>
          </div>
          </>
          
        )}
      </div>
    </>
  );
}

export default App;