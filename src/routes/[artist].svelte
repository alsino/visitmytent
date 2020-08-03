<script context="module">
  export function preload(page){
    return {artist: page.params.artist };
  }
</script>

<!-- 
<div><a href='.'>Back</a></div>
<h1>{artist}</h1> -->


<script>
  import { onMount, beforeUpdate, afterUpdate } from 'svelte';
  import ArtistInfo from '../components/ArtistInfo.svelte';   
  import { GEODATA } from '../store.js';
  import { NETWORKDATA, NETWORKCOORDINATES, nodesWithLinks } from '../store.js';
  import { VIEW, VIEWMODE, MOUSE, COLORS } from '../store.js';
  import { hoveredArtist, selectedArtist, selectedArtistDetails, selectedDiscipline } from '../store.js';
 
  import { feature } from "topojson";

  import { geoMercator, geoPath } from "d3-geo";
  import { scaleSqrt } from 'd3-scale';
  import { max, min } from "d3-array";
  import { forceSimulation, forceLink, forceManyBody, forceCenter, forceX, forceY } from "d3-force";

  export let artist;

  // import { stores } from '@sapper/app';
  // const { preloading, page, session } = stores();  

  // let windowWidth = window.innerWidth;
  // $ : width = windowWidth < 640 ? 200 : 700;

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
  let networkForce = -40;
  let circleSize;
  let getLinkClass, getNodeClass;

  let nodes = $NETWORKDATA.nodes;
  let links = $NETWORKDATA.links;

  $: coordinates = currentCoordinates($VIEW);

  $: colorScheme = $VIEWMODE == "Day" ? $COLORS.day : $COLORS.night;

  $: selectedLinks = $selectedArtistDetails ? $selectedArtistDetails.links : undefined;


  $: getNodeClass = function(node){

      if ($selectedDiscipline){


        if ($selectedArtistDetails ){
          if (node.name == $selectedArtistDetails.name) { 
            return $VIEWMODE == "Day" ?  "artist-selected-day" : "artist-selected-night"
          }
        } else {
          return node.discipline.includes($selectedDiscipline) ? 'node-active' : 'node-inactive'
        }

      }


      if ($selectedArtistDetails ){

        if(node.links.length != 0 ){
          if(node.name == $selectedArtistDetails.name) { 
              return $VIEWMODE == "Day" ?  "artist-selected-day" : "artist-selected-night"
            } else {
              return $selectedArtistDetails.linksPlain.includes(node.name) ? 'node-active' : 'node-inactive'
            };
        } else {
          if(node.name == $selectedArtistDetails.name) { 
            return $VIEWMODE == "Day" ?  "artist-selected-day" : "artist-selected-night"
            }
          return 'node-inactive';
        }
        
      }

       
    }


    $: circleSize = function(artist){

      if($VIEW == "Map"){

         if ($selectedArtistDetails){
          return artist.name == $selectedArtistDetails.name ? 3 : 3;
        } else {
          return 3
        }

      } else if ($VIEW == "Network"){

        if ($selectedArtistDetails){
          return artist.name == $selectedArtistDetails.name ? circleScale(artist.links.length) : circleScale(artist.links.length);
        } else {
          return circleScale(artist.noLinks);
        }
      }
      
    }

    $: getLinkClass = function(link, node){

       if ($selectedDiscipline) {
         if (node.discipline.includes($selectedDiscipline)) {
           
          node.links.forEach( item => {
            return item.source.discipline.includes($selectedDiscipline) ? 'link-active' : 'link-inactive';
          })

         } else {
           return 'link-inactive';
         }
      }


      if ($selectedArtistDetails){
          return link.source.name == $selectedArtistDetails.name || link.target.name == $selectedArtistDetails.name  ? 'link-active' : 'link-inactive'
        } else {
          return "link-active"
        }

      }
    

  $: minLinks = min(nodesWithLinks, d => d.noLinks);
  $: maxLinks = max(nodesWithLinks, d => d.noLinks);

  $: circleScale = scaleSqrt()
		.domain([minLinks, maxLinks])
    .range([2, 8]);
    
  // No need for simulation anymore -> Coordinates are statically generated in store
  let simulation = forceSimulation(nodes)
        .force("link", forceLink(links).id(d => d.name))
        .force("charge", forceManyBody().strength(networkForce))
        .force("center", forceCenter(width / 2, height / 2))
        .force("x", forceX())
        .force("y", forceY());

  
  onMount(() => {
    bezirkePath = path(bezirke);  
    sbahnPath = path(sBahn);   
  });


  beforeUpdate(() => {
    // Useful if we want to change network layout based on simulation 
    // simulation.on('end', function() { console.log('ended!'); console.log(JSON.stringify(coordinates)) });
    // coordinates = currentCoordinates($VIEW);
    // console.log(nodesWithLinks);
  });

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
        // coordinates = $NETWORKCOORDINATES;

      coordinates = nodes.map((item) => {
        return {
          x : item.x,
          y : item.y,
        }
      });
     
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
  handleClick(artist);
}


function handleClick(artist){
  selectedArtist.set(artist.name);
  selectedArtistDetails.set(artist);
}

function handleMouseEnter(artist){
  tooltipVisible = true;
  $hoveredArtist = artist.name;
  // selectedArtist.set(artist.name);
  // selectedArtistDetails.set(artist);
}

function handleMouseLeave(artist){
  tooltipVisible = false;
  // selectedArtist.set(undefined);
  // selectedArtistDetails.set(undefined);
}

function fade(node, {
	delay = 0,
	duration = 0
}) {
	const o = +getComputedStyle(node).opacity;

	return {
		delay,
		duration,
		css: t => `opacity: ${t * o}`
	};
}

  
</script>


<style lang="scss">
 @import "./style/theme.scss";

 #network {
   width: 100%;
   margin-top: $margin-small;
   position: relative;
   transition: all 2s;
 }

 svg  {
   display: block;
   margin: 0 auto;
   
 }

 circle {
   cursor: pointer;
   fill-opacity: 1;
 }

 .link {
  stroke-opacity: 0.2;
  transition: all 0s;
 }

 .link-inactive  {
   stroke-opacity: 0;
 }

 .link-active {
   stroke-opacity: 0.2;
 }

 .node-inactive  {
   fill-opacity: 0.1;
   pointer-events: none;
 }

 .node-active {
   fill-opacity: 1;
 }

 .artist-selected-day {
   fill: #D56285 !important;
 }

 .artist-selected-night {
   fill: yellow !important;
 }
 
 .map-bezirke {
  fill: none;
}

.map-sbahn {
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



  <svelte:window on:mousemove={handleMouseMove} style="background:{colorScheme.background}; color:{colorScheme.textDefault}"/>


  <div id="network" style="background:{colorScheme.background}; color:{colorScheme.textDefault}">
  <ArtistInfo/>
    
    <svg width ={width} height={height}>
  
      <g class="basemap">
        {#if $VIEW == "Map"}

          <path 
          d={bezirkePath} 
          class="map-bezirke"
          transition:fade="{{ duration: 2000 }}"
          stroke={colorScheme.berlinMap}
          />

          <path 
          d={sbahnPath} 
          class="map-sbahn"
          transition:fade="{{ duration: 2000 }}"
          stroke={colorScheme.berlinSbahn}
          />

        {/if}
      </g>

        
      {#if $VIEW == "Network"}
      <g class="links" in:fade="{{duration: 1000, delay: 1200 }}" out:fade="{{ duration: 0 }}">
       {#each nodesWithLinks as node, index}
          {#each node.links as link, index}

          <line 
            class="link {getLinkClass(link, node)}"
            x1={node.x}
            y1={node.y}
            x2={link.target.x}
            y2={link.target.y}
            stroke={colorScheme.network}
            >
          </line>

          {/each } 
        {/each }      
      </g>
      {/if}


    <!-- r={circleSize(location)} -->

      <g class="circles">
        {#each nodes as location, index}
          <circle 
            class={getNodeClass(location)}
            cx={coordinates[index].x} 
            cy={coordinates[index].y}
            r={circleSize(location)}
            fill={colorScheme.circleDefault} 
            stroke-width="1"
            stroke-opacity="0"
            stroke={colorScheme.circleBorder} 
            fill-opacity="0.8"
            on:click={() => handleClick(location)}
            style={`transition: all 2s, fill 0s`}
            on:mouseenter={() => handleMouseEnter(location)} 
            on:mouseleave={() =>  handleMouseLeave(location)} 
            />
        {/each }
      </g>

    </svg>
  </div>

 
  <div 
    class="tooltip {tooltipVisible ? 'active' : ''}" 
    style="top: {$MOUSE.y + 10}px; left:{$MOUSE.x + 10}px; color: {colorScheme.textTooltip}; background: {colorScheme.bgTooltip}"
    >{$MOUSE.artistName}
  </div>






