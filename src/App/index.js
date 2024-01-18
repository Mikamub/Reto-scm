import '../index.css'; 
import { Header } from '../Header';
import {PlaningStaff} from '../ChartGraph/PlanningStaff';
import React, { useState } from 'react';
import { ContainerButtonTabOne } from '../ContainerButtonTabOne';
import { ContainerButtonTabTwo } from '../ContainerButtonTabTwo';
import { Estadisticas } from '../ChartGraph/Estadisticas';


function App() {
  const [activeTab, setActiveTab] = useState(1); //Estado de las pestañas
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

  const handleTabChange = (tabNumber) => { //Manejo de las pestañas
    setActiveTab(tabNumber);
  };

  const handleSelectValuesOne = (values) => { //Manejo
    setSelectedValuesOne(values);
  };

  const handleSelectValuesTwo = (values) => {
    setSelectedValuesTwo(values);
  };

  return (
    <>
      <Header />
      <div className='tab-header'>
        <span className='container-tab'>
        <button className={activeTab === 1 ? 'active-tab' : 'tab'}
            onClick={() => handleTabChange(1)}>Resultados Staff Planning</button>
          <button className={activeTab === 2 ? 'active-tab' : 'tab'} onClick={() => handleTabChange(2)}>Estadisticas</button>
          </span>
        </div>
      <div className='container-chart'>
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
      </div>
    </>
  );
}

export default App;