import { writable } from 'svelte/store';
import geoData from './data/berlin-bezirke.json';
import networkData from './data/artists_200512.json';

export const VIEW = writable(undefined);
VIEW.set("Map");


export const GEODATA = writable(undefined);
GEODATA.set(geoData);

export const NETWORKDATA = writable(undefined);
NETWORKDATA.set(networkData);



