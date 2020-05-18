<script>
  import { GEODATA } from '../store.js';
  import { NETWORKDATA } from '../store.js';
  import { VIEW } from '../store.js';
  import { selectedArtist } from '../store.js';
  import { onMount, beforeUpdate } from 'svelte';
  import * as d3 from "d3";
  import { geoMercator, geoPath } from "d3-geo";
  import { feature } from "topojson";

  // import { tweened } from 'svelte/motion';
	// import { cubicOut } from 'svelte/easing';


  let width = 700;
  let height = 500;
  let paddingMap = 20;

  const bezirke = feature($GEODATA, $GEODATA.objects.states);
  const projection = geoMercator()
                      .fitExtent([[paddingMap, paddingMap], [width - paddingMap, height - paddingMap]], bezirke);

  const path = geoPath().projection(projection);
  let bezirkePath;

  let locations = $NETWORKDATA.nodes;
  let coordinates = {x: 0, y: 0};

  
  

  onMount(() => {
    bezirkePath = path(bezirke);  
    coordinates = currentCoordinates($VIEW);
    // console.log(locations);  
  });


  beforeUpdate(() => {
    // console.log($VIEW);
    coordinates = currentCoordinates($VIEW);
    console.log(coordinates);
  
    
  });


  function handleClick(artist){
    selectedArtist.set(artist.name);
  }

  function currentCoordinates(view){
    let coordinates;

    // let coordinatesMap = locations.map((item) => {
    //   return {
    //     x : projection([item.studioLocations[0].lon, item.studioLocations[0].lat])[0],
    //     y : projection([item.studioLocations[0].lon, item.studioLocations[0].lat])[1],
    //   }
    // });

    if (view == "Map" ) {
      coordinates = locations.map((item) => {
        return {
          x : projection([item.studioLocations[0].lon, item.studioLocations[0].lat])[0],
          y : projection([item.studioLocations[0].lon, item.studioLocations[0].lat])[1],
        }
      });

    } else {
      coordinates = locations.map((item) => {
        return {
          x : getRandomNumber(300, 500),
          y : getRandomNumber(200, 400)
        }
      });

    }

    // if ($VIEW == view){
    //    coordinates = {
    //      x: projection([location.studioLocations[0].lon, location.studioLocations[0].lat])[0],
    //      y: projection([location.studioLocations[0].lon, location.studioLocations[0].lat])[1]
    //   }
    // } else {
    //    coordinates = {
    //      x: getRandomNumber(52, 53),
    //      y: getRandomNumber(20, 400)
    //   }
    // }


    // console.log(coordinates)
    return coordinates;
  }


  function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}



  // let x; 
  // let y;

  // const position = tweened({ x: 200, y: 200 , {
	// 	duration: 400,
	// 	easing: cubicOut
  // });
  
  // let coordinates = tweened({ x: 200, y: 200 }, {
	// 	duration: 400,
	// 	easing: cubicOut
	// });
  


  
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
  
  .border {
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
        <path 
        d={bezirkePath} 
        class="border"
        />
      </g>

      <g class="circles">
        {#each locations as location, index}
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


<br>
Example: D3 w/ svelte
<div>https://svelte.dev/repl/01a5774b53e9416584428c025668407b?version=3.15.0</div>
<div>https://www.youtube.com/watch?time_continue=1&v=bnd64ZrHC0U&feature=emb_title</div>

<br>
<div>{JSON.stringify($NETWORKDATA)}</div>

