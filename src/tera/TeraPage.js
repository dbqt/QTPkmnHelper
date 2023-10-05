import { TypeList } from "../utils/TypeList";
import { GetTeraTypeSprite, GetTypeSprite, GenerateTypeMatchups, Capitalize } from "../utils/Helpers";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { Dialog, Disclosure } from '@headlessui/react'
import { ChevronUpIcon, XMarkIcon} from '@heroicons/react/20/solid';

export default function TeraPage({dex}) {
    const [focusedTera, setFocusTera] = useState(undefined);

    const [typeReceive, setTypeReceive] = useState("");

    useEffect(() => {
        const updateTypes = async () => {
            if (focusedTera) {
                setTypeReceive(await GenerateTypeMatchups(dex, focusedTera, null));
            }
        }

        updateTypes();
    }, [focusedTera]);

    return (
    <div className="flex flex-wrap justify-evenly pb-20">
        {TypeList.map(type => (
            <Button className="p-0 bg-transparent" onClick={() => setFocusTera(type)}>
                <div className="flex flex-col gap-2">
                    <img src={GetTeraTypeSprite(type)} className="w-14" />
                    <img src={GetTypeSprite(type)} className="w-14" />
                </div>
            </Button>
        ))}
        {focusedTera ? 
        <Dialog as="div" open={focusedTera !== undefined} onClose={() => setFocusTera(undefined)} className=" text-white relative z-10">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex p-4 text-center justify-center">
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-slate-700 px-4 pt-4 pb-20 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title>
                            <div className="flex justify-between gap-4 p-4">
                                <img src={GetTeraTypeSprite(focusedTera)} className="w-12" />
                                <p className="text-white self-center text-2xl">{Capitalize(focusedTera)}</p>
                                <button className="w-8 text-2xl" onClick={() => setFocusTera(undefined)}><XMarkIcon /></button>
                            </div>
                        </Dialog.Title>
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
                                        <div className="space-y-6">
                                            <div className="flex flex-wrap justify-around py-2">
                                                {typeReceive}
                                            </div>
                                        </div>
                                    </Disclosure.Panel>
                                    </div>
                                )}
                        </Disclosure>

                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
        : <></>}
    </div>
    );
}