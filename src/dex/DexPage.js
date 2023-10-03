import { useState } from 'react';
import Header from './Header';
import DexContent from './DexContent';

export default function DexPage() {
    const [selectedPokemon, setSelectedPokemon] = useState("");
    
    return (
    <>
        <Header onSearch={(pokemon) => setSelectedPokemon(pokemon)}/>
        <DexContent query={selectedPokemon} />
    </>
    );
}