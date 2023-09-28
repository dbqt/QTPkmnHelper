'use client';

import './App.css';
import { useState } from 'react';
import Header from './Header';
import Content from './Content';


function App() {
  const [selectedPokemon, setSelectedPokemon] = useState("");

  return (
    <div className="App bg-slate-800 min-h-screen h-fit">
      <Header onSearch={(pokemon) => setSelectedPokemon(pokemon)}/>
      <Content query={selectedPokemon} />
    </div>
  );
}

export default App;
