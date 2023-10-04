'use client';

import { useState, useMemo } from 'react';
import { Tab } from '@headlessui/react'
import './App.css';
import DexPage from './dex/DexPage';
import { classNames } from './utils/Helpers';
import TeraPage from './tera/TeraPage';
import { Pokedex } from "pokeapi-js-wrapper";

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const dex = useMemo(() => {
    const dexOptions = {
        cache: true,
        timeout: 5 * 1000, // 5s
        cacheImages: true
    };
    return new Pokedex(dexOptions);
  }, []);

  console.log(activeTab);

  return (
    <div className="App bg-slate-800 min-h-screen h-fit">
      <Tab.Group onChange={setActiveTab}>
        <Tab.List className='bg-sky-700 p-2 w-screen text-white flex justify-around fixed bottom-0 z-10'>
          <Tab 
            className={({ selected }) => classNames('w-full rounded-lg py-2.5 text-sm font-medium leading-5',
            selected ? 'bg-sky-900 shadow'
            : 'hover:bg-white/[0.12] hover:text-white'
          )}>
            Dex
          </Tab>
          <Tab 
            className={({ selected }) => classNames('w-full rounded-lg py-2.5 text-sm font-medium leading-5',
            selected ? 'bg-sky-900 shadow'
            : 'hover:bg-white/[0.12] hover:text-white'
          )}>
            Tera
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <DexPage dex={dex} />
          </Tab.Panel>
          <Tab.Panel>
            <TeraPage dex={dex} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default App;
