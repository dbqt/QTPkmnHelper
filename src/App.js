'use client';

import { Tab } from '@headlessui/react'
import './App.css';
import DexPage from './dex/DexPage';
import { classNames } from './utils/Helpers';
import TeraPage from './tera/TeraPage';

function App() {
  return (
    <div className="App bg-slate-800 min-h-screen h-fit">
      <Tab.Group>
        <Tab.List className='bg-sky-700 p-2 w-screen text-white flex justify-around fixed bottom-0'>
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
            <DexPage />
          </Tab.Panel>
          <Tab.Panel>
            <TeraPage />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default App;
