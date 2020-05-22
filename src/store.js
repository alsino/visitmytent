import { writable } from 'svelte/store';
import geoData from './data/geodata.json';
import networkData from './data/artists_200512.json';

export const VIEW = writable(undefined);
VIEW.set("Map");

export const selectedArtist = writable(undefined);
selectedArtist.set("");

export const GEODATA = writable(undefined);
GEODATA.set(geoData);

export const NETWORKDATA = writable(undefined);
NETWORKDATA.set(networkData);

export const MOUSE = writable(undefined);
MOUSE.set({ x: 0, y: 0});



