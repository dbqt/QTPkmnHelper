import bug from './../assets/types/bug.png';
import dark from './../assets/types/dark.png';
import dragon from './../assets/types/dragon.png';
import electric from './../assets/types/electric.png';
import fairy from './../assets/types/fairy.png';
import fighting from './../assets/types/fighting.png';
import fire from './../assets/types/fire.png';
import flying from './../assets/types/flying.png';
import ghost from './../assets/types/ghost.png';
import grass from './../assets/types/grass.png';
import ground from './../assets/types/ground.png';
import ice from './../assets/types/ice.png';
import normal from './../assets/types/normal.png';
import poison from './../assets/types/poison.png';
import psychic from './../assets/types/psychic.png';
import steel from './../assets/types/steel.png';
import rock from './../assets/types/rock.png';
import water from './../assets/types/water.png';

import terabug from './../assets/teraicons/bug.png';
import teradark from './../assets/teraicons/dark.png';
import teradragon from './../assets/teraicons/dragon.png';
import teraelectric from './../assets/teraicons/electric.png';
import terafairy from './../assets/teraicons/fairy.png';
import terafighting from './../assets/teraicons/fighting.png';
import terafire from './../assets/teraicons/fire.png';
import teraflying from './../assets/teraicons/flying.png';
import teraghost from './../assets/teraicons/ghost.png';
import teragrass from './../assets/teraicons/grass.png';
import teraground from './../assets/teraicons/ground.png';
import teraice from './../assets/teraicons/ice.png';
import teranormal from './../assets/teraicons/normal.png';
import terapoison from './../assets/teraicons/poison.png';
import terapsychic from './../assets/teraicons/psychic.png';
import terasteel from './../assets/teraicons/steel.png';
import terarock from './../assets/teraicons/rock.png';
import terawater from './../assets/teraicons/water.png';

import { TypeList } from './TypeList';

export function GetTypeSprite(name) {
    switch (name) {
        case "bug":
            return bug;
        case "dark":
            return dark;
        case "dragon":
            return dragon;
        case "electric":
            return electric;
        case "fairy":
            return fairy;
        case "fighting":
            return fighting;
        case "fire":
            return fire;
        case "flying":
            return flying;
        case "ghost":
            return ghost;
        case "grass":
            return grass;
        case "ground":
            return ground;
        case "ice":
            return ice;
        case "normal":
            return normal;
        case "poison":
            return poison;
        case "psychic":
            return psychic;
        case "steel":
            return steel;
        case "rock":
            return rock;
        case "water":
            return water;
        default:
            console.log("Could not get sprite for type: " + name);
            break;
    }
}

export function GetTeraTypeSprite(name) {
    switch (name) {
        case "bug":
            return terabug;
        case "dark":
            return teradark;
        case "dragon":
            return teradragon;
        case "electric":
            return teraelectric;
        case "fairy":
            return terafairy;
        case "fighting":
            return terafighting;
        case "fire":
            return terafire;
        case "flying":
            return teraflying;
        case "ghost":
            return teraghost;
        case "grass":
            return teragrass;
        case "ground":
            return teraground;
        case "ice":
            return teraice;
        case "normal":
            return teranormal;
        case "poison":
            return terapoison;
        case "psychic":
            return terapsychic;
        case "steel":
            return terasteel;
        case "rock":
            return terarock;
        case "water":
            return terawater;
        default:
            console.log("Could not get sprite for type: " + name);
            break;
    }
}

export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export async function GenerateTypeMatchups(dex, type1, type2) {
    
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

    return (TypeList.map(type => 
    <div className="flex flex-row items-center gap-4 w-28 my-1 pl-2">
        <img src={GetTypeSprite(type)} alt={type} className="w-16"/>
        <p className={classNames("text-center", typing[type] > 1 ? "text-green-300" : typing[type] < 1 ? "text-red-400" : "text-white")}>{typing[type]}</p>
    </div>));
}

export function Capitalize(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
}