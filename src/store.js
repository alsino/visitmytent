import { writable } from 'svelte/store';
import networkData from './data/artists_200113.json';


export const DATA = writable(undefined);
DATA.set(networkData);



