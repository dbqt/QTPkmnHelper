'use client';

import { useState, useMemo } from 'react';
import { Tab } from '@headlessui/react'
import './App.css';
import DexPage from './dex/DexPage';
import { classNames } from './utils/Helpers';
import TeraPage from './tera/TeraPage';
import { Pokedex } from "pokeapi-js-wrapper";
import dbqt from "./assets/dblogotransparentfat.png";

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

  return (
    <div className="App bg-slate-800 min-h-screen h-fit">
      <Tab.Group onChange={setActiveTab}>
        <Tab.List className='bg-sky-700 p-2 w-screen text-white flex justify-around fixed bottom-0 z-10 space-x-2'>
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
          <Tab 
            className={({ selected }) => classNames('rounded-lg',
            selected ? 'bg-sky-900 shadow'
            : 'hover:bg-white/[0.12] hover:text-white'
          )}>
            <img src={dbqt} alt="dbqt icon" className='w-24 px-2'/>
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <DexPage dex={dex} />
          </Tab.Panel>
          <Tab.Panel>
            <TeraPage dex={dex} />
          </Tab.Panel>
          <Tab.Panel>
            <div className='text-white flex flex-col text-center justify-content-center content-center p-12 space-y-4'>
              <img src={dbqt} alt="dbqt icon" className='w-16 h-16 self-center'/>
              <p>App built with love by Dbqt</p>
              <p>Data provided by <a href="https://pokeapi.co/" className="underline text-sky-200">PokeAPI</a></p>
              <p>For any queries, you can open an issue on <a href="https://github.com/dbqt/QTPkmnHelper/issues" className="underline text-sky-200">GitHub</a></p>
              <p>For more projects, join the <a href="https://discord.com/invite/kmdh6RQ" className="underline text-sky-200">Discord</a></p>
              <p>To find out more about what I do, check out <a href="https://linktr.ee/dbqt" className="underline text-sky-200">my socials</a></p>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default App;
