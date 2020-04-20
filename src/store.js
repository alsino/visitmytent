import { writable } from 'svelte/store';
import networkData from './data/artists_200113.json';
// import * as d3 from "d3";

export const DATA = writable(undefined);
DATA.set(networkData);



