<script>
  import ArtistInfo from '../components/ArtistInfo.svelte';   
  import { GEODATA } from '../store.js';
  import { NETWORKDATA, NETWORKCOORDINATES } from '../store.js';
  import { VIEW, VIEWMODE, MOUSE, COLORS } from '../store.js';
  import { hoveredArtist, selectedArtist, selectedArtistDetails, selectedDiscipline } from '../store.js';
  import { onMount, beforeUpdate, afterUpdate } from 'svelte';
  import { feature } from "topojson";

  import * as d3 from "d3";
  import { geoMercator, geoPath } from "d3-geo";
  import { scaleSqrt } from 'd3-scale';
  import { extent, max, min } from "d3-array";

  // import { forceSimulation, forceLink, forceManyBody, forceCenter } from 'd3-force';

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
  let circleColor;
  let circleSize;
  let getLinkClass, getNodeClass;

  let nodes = $NETWORKDATA.nodes;
  let links = $NETWORKDATA.links;

  $: colorScheme = $VIEWMODE == "Day" ? $COLORS.day : $COLORS.night;

  $: selectedLinks = $selectedArtistDetails ? $selectedArtistDetails.links : undefined;

  let nodesWithLinks = nodes.map((item, index) => {

    // Return all links from one artist - OUT
    let artistLinksOut = links.filter(function(link) {
      return link.source == item.name;
    });

    // Return all links from one artist - IN
    let artistLinksIn = links.filter(function(link) {
      return link.target == item.name;
    });

    // Return artist coordinates
    let artistCoordinates = currentCoordinates($VIEW)[index];

    item.links = [...artistLinksOut, ...artistLinksIn];
    item.noLinks = item.links.length;
    item.artistCoordinates = artistCoordinates;

    return item
  })

  $: console.log($selectedDiscipline);

  $: minLinks = min(nodesWithLinks, d => d.noLinks);
  $: maxLinks = max(nodesWithLinks, d => d.noLinks);
  $: extentLinks = extent(nodesWithLinks, d => d.noLinks);

  $: circleScale = scaleSqrt()
		.domain([minLinks, maxLinks])
    .range([2, 8]);
    
  // No need for simulation anymore -> Coordinates are statically generated in store
  let simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.name))
        .force("charge", d3.forceManyBody().strength(networkForce))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("x", d3.forceX())
        .force("y", d3.forceY());

  
  onMount(() => {
    bezirkePath = path(bezirke);  
    sbahnPath = path(sBahn); 
    // console.log(colorScheme);
  });


  beforeUpdate(() => {
    // Useful if we want to change network layout based on simulation 
    // simulation.on('end', function() { console.log('ended!'); console.log(JSON.stringify(coordinates)) });
    coordinates = currentCoordinates($VIEW);
    
    circleColor = function(artist){

      if ($selectedArtistDetails){
        return artist.name == $selectedArtistDetails.name ? colorScheme.circleSelected : colorScheme.circleDefault; 
      } else {
        return colorScheme.circleDefault;
      }
      
    }

    circleSize = function(artist){

      if($VIEW == "Map"){

         if ($selectedArtistDetails){
          return artist.name == $selectedArtistDetails.name ? 3 * 1.5 : 3;
        } else {
          return 3
        }

      } else if ($VIEW == "Network"){

        if ($selectedArtistDetails){
          return artist.name == $selectedArtistDetails.name ? circleScale(artist.links.length) * 1.5 : circleScale(artist.links.length);
        } else {
          return circleScale(artist.noLinks);
        }

      }
    }

    getLinkClass = function(link){
      if ($selectedArtistDetails){
          return link.source.name == $selectedArtistDetails.name || link.target.name == $selectedArtistDetails.name  ? 'link-active' : 'link-inactive'
        } else {
          return "link-active"
        }
      }

    getNodeClass = function(node){
       if ($selectedDiscipline) {
        return node.discipline.includes($selectedDiscipline) ? 'node-active' : 'node-inactive'
      }
    }


     

  });


  function handleClick(artist){
    selectedArtist.set(artist.name);
    selectedArtistDetails.set(artist);
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

      // coordinates = nodes.map((item) => {
      //   return {
      //     x : item.x,
      //     y : item.y,
      //   }
      // });
     
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
   fill-opacity: 0;
 }

 .node-active {
   fill-opacity: 1;
 }
 
 .map-bezirke {
  // stroke: #c7c7c7;
  // stroke: rgb(69, 69, 255);
  fill: none;
}

.map-sbahn {
  // stroke: #3d3d3d;
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
            x1={node.artistCoordinates.x}
            y1={node.artistCoordinates.y}
            x2={link.target.artistCoordinates.x}
            y2={link.target.artistCoordinates.y}
            stroke={colorScheme.network}
            >
          </line>

          {/each } 
        {/each }      
      </g>
      {/if}



      <g class="circles">
        {#each nodes as location, index}
          <circle 
            class={getNodeClass(location)}
            cx={coordinates[index].x} 
            cy={coordinates[index].y} 
            r={circleSize(location)}
            stroke-width="1"
            stroke-opacity="0"
            stroke={colorScheme.circleBorder} 
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
    style="top: {$MOUSE.y + 10}px; left:{$MOUSE.x + 10}px; color: {colorScheme.textTooltip}"
    >{$MOUSE.artistName}
  </div>



<!-- <br>
Example: D3 w/ svelte
<div>https://svelte.dev/repl/01a5774b53e9416584428c025668407b?version=3.15.0</div>
<div>https://www.youtube.com/watch?time_continue=1&v=bnd64ZrHC0U&feature=emb_title</div> -->

<!-- <br>
<div>{JSON.stringify($NETWORKDATA)}</div> -->

