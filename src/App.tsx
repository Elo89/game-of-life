import React from 'react';
// import './App.css';
import GameOfLife from './containers/GameOfLife';

function App() {
  return (
    <div className="App">
      <GameOfLife dimension={30}/>
    </div>
  );
}

export default App;
