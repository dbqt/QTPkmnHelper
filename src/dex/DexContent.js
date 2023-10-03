import { useEffect, useState, useMemo } from "react";
import { Pokedex } from "pokeapi-js-wrapper";
import { Accordion, Card } from 'flowbite-react';
import { TypeList } from "../utils/TypeList";
import { GetTypeSprite } from "../utils/Helpers";

function Capitalize(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
}

export default function DexContent({ query }) {
    
    const dex = useMemo(() => {
        const dexOptions = {
            cache: true,
            timeout: 5 * 1000, // 5s
            cacheImages: true
        };
        return new Pokedex(dexOptions);
    }, []);

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
                let sanitizedQuery = queryValue.toLowerCase().replace(' ', '-');
                dex.getPokemonByName(sanitizedQuery)
                .then(function(response) {
                  console.log(response)
                  setPokemon(response);
                });
            }
        }
    }, [dex, queryValue]);

    useEffect(() => {
        if (pokemon !== null) {
            if (pokemon.types.length === 1) {
                GenerateTypeMatchups(dex, pokemon.types[0].type.name, null);
            }
            else if (pokemon.types.length === 2) {
                GenerateTypeMatchups(dex, pokemon.types[0].type.name, pokemon.types[1].type.name);
            }
        }
    }, [pokemon, dex])

    async function GenerateTypeMatchups(dex, type1, type2) {
    
        let t1 = await dex.getTypeByName(type1);
        let typing = Object.fromEntries(TypeList.map((k, v) => [k, 1]));
        t1.damage_relations.double_damage_from.forEach(t => typing[t.name] *= 2.0);
        t1.damage_relations.half_damage_from.forEach(t => typing[t.name] *= 0.5);
        t1.damage_relations.no_damage_from.forEach(t => typing[t.name] *= 0.0);
    
        if (type2 !== null) {
            let t2 = await dex.getTypeByName(type2);
            t2.damage_relations.double_damage_from.forEach(t => typing[t.name] *= 2.0);
            t2.damage_relations.half_damage_from.forEach(t => typing[t.name] *= 0.5);
            t2.damage_relations.no_damage_from.forEach(t => typing[t.name] *= 0.0);
        }
    
        setTypeChart(TypeList.map(type => 
        <div className="flex flex-col grow items-center mx-2">
            <img src={GetTypeSprite(type)} alt={type} className="w-16"/>
            <p className="text-center mb-2">{typing[type]}</p>
        </div>));
    }

    return (
        <div>
            {   (isLoading) ? 
                <Card className="text-2xl tracking-tight text-white bg-slate-700 m-4">Loading</Card>
                :
                (pokemon == null)
                    ?
                    <Card className="text-xl tracking-tight text-white bg-slate-700 m-4">Type the name of a Pokemon</Card>
                    : 
                    <Card className="text-base tracking-tight text-white bg-slate-700 m-4">
                        <p className="text-2xl">{pokemon.id + " " + Capitalize(pokemon.name)}</p>
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
                                        Types weaknesses
                                    </Accordion.Title>
                                    <Accordion.Content>
                                        <div className="flex flex-wrap">
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