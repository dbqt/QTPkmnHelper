import { useState, useEffect } from 'react';
import { Combobox } from '@headlessui/react';
import { PokemonList } from '../utils/PokemonList';

export default function Header({ onSearch }) {
    const [selectedPokemon, setSelectedPokemon] = useState(PokemonList[0])
    const [query, setQuery] = useState('')

    const filteredPokemon =
        query === ''
        ? PokemonList.slice(0, 10)
        : PokemonList.filter((pokemon) => {
            return pokemon.toLowerCase().includes(query.toLowerCase())
            }).slice(0, 10);

    useEffect(() => {
        onSearch(selectedPokemon);
    }, [selectedPokemon]);

    return (
        <div className='bg-sky-700 p-2 w-screen'>
            <Combobox value={selectedPokemon} onChange={setSelectedPokemon}>
                <Combobox.Input onChange={(event) => setQuery(event.target.value)} className='bg-slate-700 text-white border border-gray-300 rounded-lg w-full'/>
                <Combobox.Options>
                <div className=' px-4'>
                    {filteredPokemon.map((pokemon) => (
                        <Combobox.Option key={pokemon} value={pokemon}>
                            <p className='text-white py-1'>
                            {pokemon}
                            </p>
                        </Combobox.Option>
                    ))}
                    </div>
                </Combobox.Options>
            </Combobox>
        </div>
    );
}