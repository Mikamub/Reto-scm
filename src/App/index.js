import '../index.css'; 
import { Header } from '../Header';
import ChartComponent from '../ChartGraph';
import React, { useState } from 'react';
import { ContainerButtonTabOne } from '../ContainerButtonTabOne';
import { ContainerButtonTabTwo } from '../ContainerButtonTabTwo';


function App() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <>
      <Header />
      <div className='tab-header'>
        <span className='container-tab'>
        <button className={activeTab === 1 ? 'active-tab' : 'tab'}
            onClick={() => handleTabChange(1)}>Resultados Staff Planing</button>
          <button className={activeTab === 2 ? 'active-tab' : 'tab'} onClick={() => handleTabChange(2)}>Estadisticas</button>
          </span>
        </div>
      <div className='container-chart'>
        {activeTab === 1 && (
          <>
            <ContainerButtonTabOne/>
            <ChartComponent />
          </>
        )}
        {activeTab === 2 && (
          <>
            <ContainerButtonTabTwo/>
          </>
        )}
      </div>
    </>
  );
}

export default App;