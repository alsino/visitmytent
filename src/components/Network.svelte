<script>
  import { GEODATA } from '../store.js';
  import { NETWORKDATA } from '../store.js';
  import { VIEW } from '../store.js';
  import { selectedArtist } from '../store.js';
  import { onMount, beforeUpdate } from 'svelte';
  import * as d3 from "d3";
  import { geoMercator, geoPath } from "d3-geo";
  import { feature } from "topojson";
  import { fade } from 'svelte/transition';

  import { forceSimulation, forceLink, forceManyBody, forceCenter } from 'd3-force';

  // import { tweened } from 'svelte/motion';
	// import { cubicOut } from 'svelte/easing';


  let width = 700;
  let height = 600;
  let paddingMap = 20;

  const bezirke = feature($GEODATA, $GEODATA.objects.states);
  const projection = geoMercator()
                      .fitExtent([[paddingMap, paddingMap], [width - paddingMap, height - paddingMap]], bezirke);

  const path = geoPath().projection(projection);
  let bezirkePath;

  let nodes = $NETWORKDATA.nodes;
  let links = $NETWORKDATA.links;

  let coordinates = {x: 0, y: 0};

  let networkForce = -4;

  let simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.name))
        .force("charge", d3.forceManyBody().strength(networkForce))
        .force("center", d3.forceCenter(width / 2, height / 2));
  
  onMount(() => {
    bezirkePath = path(bezirke);  
    coordinates = currentCoordinates($VIEW);
  });


  beforeUpdate(() => {
    coordinates = currentCoordinates($VIEW);
    console.log(nodes);
  });


  function handleClick(artist){
    // selectedArtist.set(artist.name);
  }

  function currentCoordinates(view){
    let coordinates;
    if (view == "Map") {
      coordinates = nodes.map((item) => {
        return {
          x : projection([item.studioLocations[0].lon, item.studioLocations[0].lat])[0],
          y : projection([item.studioLocations[0].lon, item.studioLocations[0].lat])[1],
        }
      });

    } else if (view == "Network")  {

      console.log(nodes);
    
      coordinates = nodes.map((item) => {
        return {
          x : item.x,
          y : item.y
        }
      });
    }
    return coordinates;
  }

  function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
  
</script>


<style lang="scss">
 @import "./style/theme.scss";

 #network {
   width: 100%;
   background: $color-grey;
   margin-top: $margin-small;
 }

 svg  {
   display: block;
   margin: 0 auto;
 }

 circle {
   cursor: pointer;
 }

 .circle {
   transition: all 0.3s ease-out;
 }
  
  .map-border {
    stroke: #9b9b9b;
    fill: none;
  }



</style>


  <div id="network">
    {#if $selectedArtist}
      <div>{$selectedArtist}</div>
    {/if}
    
    <svg width ={width} height={height}>
  
      <g class="map">
        {#if $VIEW == "Map"}
          <path 
          d={bezirkePath} 
          class="map-border"
          transition:fade="{{ duration: 2000 }}"
          />
        {/if}

      </g>

      <g class="circles">
        {#each nodes as location, index}
          <circle 
            cx={coordinates[index].x} 
            cy={coordinates[index].y} 
            r="4" 
            stroke="none" 
            stroke-width="1" 
            fill="black" 
            fill-opacity="0.5"
            on:click={() => handleClick(location)}
            style={`transition: all 2s`}
            />
        {/each }
      </g>


    </svg>
  </div>


<!-- <br>
Example: D3 w/ svelte
<div>https://svelte.dev/repl/01a5774b53e9416584428c025668407b?version=3.15.0</div>
<div>https://www.youtube.com/watch?time_continue=1&v=bnd64ZrHC0U&feature=emb_title</div> -->

<!-- <br>
<div>{JSON.stringify($NETWORKDATA)}</div> -->

