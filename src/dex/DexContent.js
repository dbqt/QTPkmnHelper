import { useEffect, useState } from "react";

import { Card } from 'flowbite-react';
import { GetTypeSprite, classNames } from "../utils/Helpers";
import { GenerateTypeMatchups, Capitalize } from "../utils/Helpers";
import { PokemonList } from '../utils/PokemonList';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import dbqt from './../assets/dblogotransparentfat.png';

export default function DexContent({ dex, query }) {

    const [isLoading, setIsLoading] = useState(false);
    const [queryValue, setQueryValue] = useState("");
    const [pokemonSpecies, setPokemonSpecies] = useState(undefined);
    const [pokemon, setPokemon] = useState(null);
    const [typeChart, setTypeChart] = useState("");
    const [currentFormIndex, setCurrentFormIndex] = useState(0);
    
    // Update query
    useEffect(() => {
        setQueryValue(query);
    });

    // update species
    useEffect(() => {
        let id = PokemonList.indexOf(queryValue);
        console.log("querying species " + id);
        if (id) {
            // Use ID
            if (Number.isInteger(id) && id > 0) {
                dex.getPokemonSpeciesByName(id)
                .then(function(response) {
                  setCurrentFormIndex(0);
                  setPokemonSpecies(response);
                });
            }
        }
    }, [dex, queryValue]);

    // update pokemon forms
    useEffect(() => {
        if (pokemonSpecies) {
            const getPokemonSpecies = async () => {
                let pokemonArray = [];
                for (let i = 0; i < pokemonSpecies.varieties.length; i++) {
                    let name = pokemonSpecies.varieties[i].pokemon.name;
                    let p = await dex.getPokemonByName(name);
                    pokemonArray.push(p);
                } 
                setPokemon(pokemonArray); 
            }

            getPokemonSpecies();
        }
    }, [dex, pokemonSpecies])

    // Update type chart
    useEffect(() => {
        if (pokemon) {
            const updateTypes = async () => { 
                if (pokemon[currentFormIndex]) {
                    if (pokemon[currentFormIndex].types.length === 1) {
                        setTypeChart(await GenerateTypeMatchups(dex, pokemon[currentFormIndex].types[0].type.name, null));
                    }
                    else if (pokemon[currentFormIndex].types.length === 2) {
                        setTypeChart(await GenerateTypeMatchups(dex, pokemon[currentFormIndex].types[0].type.name, pokemon[currentFormIndex].types[1].type.name));
                    }
                }
            }

            updateTypes();
        }
    }, [pokemon, currentFormIndex, dex])

    function getPokemonSprite(sprites) {
        console.log(sprites)
        if (sprites["front_default"]) {
            return sprites["front_default"];
        }
        else if (sprites["other"]["official-artwork"]["front_default"]) {
            console.log("official")
            return sprites["other"]["official-artwork"]["front_default"];
        }
        else {
            console.log("fallback")
            return dbqt;
        }
    }

    return (
        <div className="pb-20">
            {   
            (isLoading) ? 
                <Card className="text-2xl tracking-tight text-white bg-slate-700 m-4">Loading</Card>
                :
                (pokemon == null || pokemon[currentFormIndex] == null)
                    ?
                    <Card className="text-xl tracking-tight text-white bg-slate-700 m-4 border-0">Type the name of a Pokemon</Card>
                    : 
                    <Card className="text-base tracking-tight text-white bg-slate-700 m-4 border-0">
                        {/** Basic data */}
                        <p className="text-2xl">{pokemonSpecies.id + " - " + Capitalize(query)}</p>
                        <div className="flex flex-row justify-evenly h-24">
                            <div className="flex flex-col self-center">
                                {pokemon[currentFormIndex].types.map((type) => (<img src={GetTypeSprite(type.type.name)} alt={type.type.name} className="w-16 my-1" />))}
                            </div>
                            <img src={getPokemonSprite(pokemon[currentFormIndex].sprites)} alt={pokemon[currentFormIndex].name} className="w-24"/>
                        </div>
                        <div className="w-full">
                            <div className="pb-1">
                                <Disclosure>
                                {({ open }) => (
                                    pokemon.length > 1 ? 
                                        <div className="border border-slate-600 rounded-lg">
                                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-slate-600 px-4 py-2 text-left text-sm font-medium text-white">
                                                <span>Forms</span>
                                                <ChevronUpIcon
                                                    className={`${
                                                        open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-white`}
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel>
                                                {/** Form selector */}
                                                <div className="flex flex-wrap py-2">
                                                        {pokemon.map((p, index) => 
                                                            <button onClick={() => setCurrentFormIndex(index)} className={classNames(" min-w-16 w-16 h-16 rounded-xl mx-1", currentFormIndex == index ? "bg-slate-500" : "")}>
                                                                <img src={getPokemonSprite(pokemon[index].sprites)} alt={pokemon[index].name} />
                                                            </button>
                                                        )}
                                                </div>
                                            </Disclosure.Panel> 
                                        </div>
                                    : <></>)}
                                </Disclosure>
                            </div>
                            <Disclosure defaultOpen>
                                {({ open }) => (
                                    <div className="border border-slate-600 rounded-lg">
                                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-slate-600 px-4 py-2 text-left text-sm font-medium text-white">
                                            <span>Damage Taken</span>
                                            <ChevronUpIcon
                                                className={`${
                                                    open ? 'rotate-180 transform' : ''
                                                } h-5 w-5 text-white`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel>
                                            <div className="flex flex-wrap justify-around py-2">
                                                {typeChart}
                                            </div>
                                        </Disclosure.Panel>
                                    </div>
                                )}
                            </Disclosure>
                            
                        </div>
                    </Card>
            }
        </div>
    );
};