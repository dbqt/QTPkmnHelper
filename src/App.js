'use client';

import './App.css';
import { useState } from 'react';
import Header from './Header';


function App() {
  const [selectedPokemon, setSelectedPokemon] = useState("");

  return (
    <div className="App bg-slate-800 h-screen">
      <Header onSearch={(pokemon) => setSelectedPokemon(pokemon)}/>
      <p>{selectedPokemon}</p>
    </div>
  );
}

export default App;
