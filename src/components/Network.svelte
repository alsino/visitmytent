<script>
  import { GEODATA } from '../store.js';
  import { NETWORKDATA, NETWORKCOORDINATES } from '../store.js';
  import { VIEW, MOUSE } from '../store.js';
  import { selectedArtist, hoveredArtist } from '../store.js';
  import { onMount, beforeUpdate, afterUpdate } from 'svelte';
  import * as d3 from "d3";
  import { geoMercator, geoPath } from "d3-geo";
  import { feature } from "topojson";
  import { fade } from 'svelte/transition';

  import { forceSimulation, forceLink, forceManyBody, forceCenter } from 'd3-force';

  let width = 700;
  let height = 600;
  let paddingMap = 20;
  let tooltipVisible = false;

  const bezirke = feature($GEODATA, $GEODATA.objects.bezirke);
  const sBahn = feature($GEODATA, $GEODATA.objects.sbahn);
  const projection = geoMercator()
                      .fitExtent([[paddingMap, paddingMap], [width - paddingMap, height - paddingMap]], bezirke);

  const path = geoPath().projection(projection);
  let bezirkePath;
  let sbahnPath;

  let coordinates;
  let networkForce = -4;
  let circleColor;
  let circleSize;

  let nodes = $NETWORKDATA.nodes;
  let links = $NETWORKDATA.links;

  let nodesWithLinks = nodes.map((item, index) => {

    // Return all links by one artist
    let artistLinks = links.filter(function(link) {
      return link.source == item.name;
    });

    // Return artist coordinates
    let artistCoordinates = currentCoordinates($VIEW)[index];

    item.links = artistLinks;
    item.artistCoordinates = artistCoordinates;

    return item
  })

  // No need for simulation anymore -> Coordinates are statically generated in store
  let simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.name))
        .force("charge", d3.forceManyBody().strength(networkForce))
        .force("center", d3.forceCenter(width / 2, height / 2));
  
  onMount(() => {
    bezirkePath = path(bezirke);  
    sbahnPath = path(sBahn); 
    // console.log($VIEW);
  });


  beforeUpdate(() => {
    // Useful if we want to change network layout based on simulation 
    // simulation.on('end', function() { console.log('ended!'); console.log(JSON.stringify(coordinates)) });
    coordinates = currentCoordinates($VIEW);
    circleColor = function(artist){
      return artist.name == $selectedArtist ? "red" : "black";
    }

    circleSize = function(artist){
      return artist.name == $selectedArtist ? "10" : "4";
    }

  });


  function handleClick(artist){
    // selectedArtist.set(artist.name);
    // console.log(artist.profileID)
    let url = `https://visitmytent.com/?p=${artist.profileID}`;
    window.open(url);
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
        coordinates = $NETWORKCOORDINATES;
    }
    return coordinates;
  }

  function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


function handleMouseMove(e){
  MOUSE.set({x: e.pageX, y: e.pageY, artistName: $hoveredArtist});
  // console.log($MOUSE)
}

function handleMouseOver(artist){
  $hoveredArtist = artist.name;
  // console.log(artist.name)
  // console.log(artist.name == $selectedArtist)
  // console.log(circleColor(artist));
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

 line {
   stroke: blue;
   stroke-opacity: 0.2;
 }

 .map-bezirke {
  stroke: #c7c7c7;
  fill: none;
}

.map-sbahn {
  stroke: #4974ff;
  fill: none;
}

.tooltip {
  position: absolute;
  pointer-events: none;
  display: none;
  padding: $margin-small / 2;
  background-color: white;
}

.active {
  display: block;
}

</style>



  <svelte:window on:mousemove={handleMouseMove}/>


  <div id="network">
    
    <svg width ={width} height={height}>
  
      <g class="basemap">
        {#if $VIEW == "Map"}

          <path 
          d={bezirkePath} 
          class="map-bezirke"
          transition:fade="{{ duration: 2000 }}"
          />

          <path 
          d={sbahnPath} 
          class="map-sbahn"
          transition:fade="{{ duration: 2000 }}"
          />

        {/if}
      </g>

      
      {#if $VIEW == "Network"}
      <g class="links" transition:fade="{{ duration: 2000 }}">
       {#each nodesWithLinks as node, index}
          {#each node.links as link, index}

          <line 
            x1={node.artistCoordinates.x}
            y1={node.artistCoordinates.y}
            x2={link.target.artistCoordinates.x}
            y2={link.target.artistCoordinates.y}
            >
          </line>

          {/each } 
        {/each }      
      </g>
      {/if}



      <g class="circles">
        {#each nodes as location, index}
          <circle 
            cx={coordinates[index].x} 
            cy={coordinates[index].y} 
            r={circleSize(location)}
            stroke-width="0" 
            fill={circleColor(location)}
            fill-opacity="0.8"
            on:click={() => handleClick(location)}
            style={`transition: all 2s, fill 0s`}
            on:mouseover={() => handleMouseOver(location)} 
            on:mouseenter={() => tooltipVisible = true} 
            on:mouseleave={() =>  tooltipVisible = false} 
            />
        {/each }
      </g>

    </svg>
  </div>

 
  <div 
    class="tooltip {tooltipVisible ? 'active' : ''}" 
    style="top: {$MOUSE.y + 10}px; left:{$MOUSE.x + 10}px;"
    >{$MOUSE.artistName}
  </div>



<!-- <br>
Example: D3 w/ svelte
<div>https://svelte.dev/repl/01a5774b53e9416584428c025668407b?version=3.15.0</div>
<div>https://www.youtube.com/watch?time_continue=1&v=bnd64ZrHC0U&feature=emb_title</div> -->

<!-- <br>
<div>{JSON.stringify($NETWORKDATA)}</div> -->

