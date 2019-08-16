import React from 'react';
import {Snake} from './games'
import './App.css';

function App() {
  return (
    <div className="App">
      <Snake width={20} height={20}/>
    </div>
  );
}

export default App;
