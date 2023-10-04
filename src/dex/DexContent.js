import { useEffect, useState, useMemo } from "react";

import { Accordion, Card } from 'flowbite-react';
import { GetTypeSprite } from "../utils/Helpers";
import { GenerateTypeMatchups, Capitalize } from "../utils/Helpers";

export default function DexContent({ dex, query }) {

    const [isLoading, setIsLoading] = useState(false);
    const [queryValue, setQueryValue] = useState("");
    const [pokemon, setPokemon] = useState(null);
    const [typeChart, setTypeChart] = useState("");
    
    useEffect(() => {
        console.log("set query " + query);
        setQueryValue(query);
    });

    useEffect(() => {
        if (queryValue) {
            if (Number.isInteger(queryValue)) {
                dex.getPokemon(queryValue)
                .then(function(response) {
                  console.log(response)
                  setPokemon(response);
                });
            }
            else {
                let sanitizedQuery = queryValue.toLowerCase().replace(' ', '-').replace('.','');
                dex.getPokemonByName(sanitizedQuery)
                .then(function(response) {
                  console.log(response)
                  setPokemon(response);
                });
            }
        }
    }, [dex, queryValue]);

    useEffect(() => {

        const updateTypes = async () => {
            if (pokemon !== null) {
                if (pokemon.types.length === 1) {
                    setTypeChart(await GenerateTypeMatchups(dex, pokemon.types[0].type.name, null));
                }
                else if (pokemon.types.length === 2) {
                    setTypeChart(await GenerateTypeMatchups(dex, pokemon.types[0].type.name, pokemon.types[1].type.name));
                }
            }
        }

        updateTypes();
        
    }, [pokemon, dex])

    return (
        <div className="pb-20">
            {   (isLoading) ? 
                <Card className="text-2xl tracking-tight text-white bg-slate-700 m-4">Loading</Card>
                :
                (pokemon == null)
                    ?
                    <Card className="text-xl tracking-tight text-white bg-slate-700 m-4">Type the name of a Pokemon</Card>
                    : 
                    <Card className="text-base tracking-tight text-white bg-slate-700 m-4">
                        <p className="text-2xl">{pokemon.id + " " + Capitalize(query)}</p>
                        <div className="flex flex-row justify-evenly">
                            <div className="flex flex-col self-center">
                                {pokemon.types.map((type) => (<img src={GetTypeSprite(type.type.name)} alt={type.type.name} className="w-16 my-1" />))}
                            </div>
                            <img src={pokemon.sprites["front_default"]} alt={pokemon.name} className="w-32"/>
                        </div>
                        <div>
                            <Accordion className="bg-gray-800">
                                {/** Type matchups */}
                                <Accordion.Panel>
                                    <Accordion.Title>
                                        Damage taken
                                    </Accordion.Title>
                                    <Accordion.Content>
                                        <div className="flex flex-wrap justify-around">
                                            {typeChart}
                                        </div>
                                    </Accordion.Content>
                                </Accordion.Panel>
                                {/** Moves */}
                                {/*<Accordion.Panel>
                                    <Accordion.Title>
                                        Moves
                                    </Accordion.Title>
                                
                                    <Accordion.Content>
                                        <Table className="text-white w-full">
                                            <Table.Head className="bg-gray-800">
                                                <Table.HeadCell>
                                                    Name
                                                </Table.HeadCell>
                                            </Table.Head>
                                            <Table.Body >
                                            {pokemon.moves.map((move) => (
                                                <Table.Row className="bg-gray-900">
                                                    <Table.Cell>
                                                        {move.move.name}
                                                    </Table.Cell>
                                                </Table.Row>
                                            ))}
                                            </Table.Body>
                                        </Table>
                                    </Accordion.Content>
                                
                                </Accordion.Panel>
                                */}
                            </Accordion>
                            
                        </div>

                    </Card>
            }
        </div>
    );
};