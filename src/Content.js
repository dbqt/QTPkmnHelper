import { useEffect, useState } from "react";
import { Pokedex } from "pokeapi-js-wrapper";
import { Card } from 'flowbite-react';
import { Accordion } from 'flowbite-react';
import { Table } from 'flowbite-react';
import { Tab } from "@headlessui/react";

function Capitalize(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
}

function GenerateTypeMatchups(type1, type2) {
    for (let i = 0; i < 18; i++) {
        // generate data for table
    }
}

export default function Content({ query }) {

    const dex = new Pokedex();

    const [queryValue, setQueryValue] = useState("");
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        setQueryValue(query);
    })

    useEffect(() => {
        if (query !== "") {
            let sanitizedQuery = query.toLowerCase().replace(' ', '-');
            dex.getPokemonByName(sanitizedQuery)
            .then(function(response) {
              console.log(response)
              setPokemon(response);
            });
        }
    }, [queryValue]);

    return (
        <div>
            {
                (pokemon == null)
                    ? "No Pokemon" : 
                    <Card className="text-base tracking-tight text-white bg-slate-700 m-4">
                        <p className="text-2xl">{pokemon.id + " " + Capitalize(pokemon.name)}</p>
                        <img src={pokemon.sprites["front_default"]}></img>
                        <div className="flex flex-row justify-center">
                            {pokemon.types.map((type) => (<p className="mx-2">{type.type.name}</p>))}
                        </div>
                        <div>
                            <Accordion collapseAll>
                                <Accordion.Panel>
                                    <Accordion.Title>
                                        Moves
                                    </Accordion.Title>
                                    <Accordion.Content>
                                        <Table className="text-white w-full">
                                            <Table.Head className="bg-gray-800">
                                                <Table.HeadCell>
                                                    Name
                                                </Table.HeadCell>
                                                {/*<Table.HeadCell>
                                                    Type
                                                </Table.HeadCell>
                                                <Table.HeadCell>
                                                    Power
                                                </Table.HeadCell>
                                                <Table.HeadCell>
                                                    Acc
                                                </Table.HeadCell>
                                                <Table.HeadCell>
                                                    Effect
                                                </Table.HeadCell>*/}
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
                                <Accordion.Panel>
                                    <Accordion.Title>
                                        Types weaknesses
                                    </Accordion.Title>
                                    <Accordion.Content>
                                        <Table className="text-white w-full">
                                            <Table.Head className="bg-gray-800">
                                                <Table.HeadCell>
                                                    Name
                                                </Table.HeadCell>
                                            </Table.Head>
                                            <Table.Body >
                                                <Table.Row className="bg-gray-900">
                                                    <Table.Cell>
                                                        Type
                                                    </Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                    </Accordion.Content>
                                </Accordion.Panel>
                            </Accordion>
                            
                        </div>

                    </Card>
            }
        </div>
    );
};