<script>
  import { GEODATA } from '../store.js';
  import { NETWORKDATA } from '../store.js';
  import { onMount, beforeUpdate } from 'svelte';
  import * as d3 from "d3";
  import { geoMercator, geoPath } from "d3-geo";
  import { feature } from "topojson";

  let width = 700;
  let height = 500;
  let paddingMap = 20;

  const bezirke = feature($GEODATA, $GEODATA.objects.states);
  const projection = geoMercator()
                      .fitExtent([[paddingMap, paddingMap], [width - paddingMap, height - paddingMap]], bezirke);

  const path = geoPath().projection(projection);
  let bezirkePath;

  let locations = $NETWORKDATA.nodes;
  let selectedLocation;
  

  onMount(() => {
    bezirkePath = path(bezirke);
    // locations.forEach((item, i) => {
    //   if (item.studioLocations) {
    //       let lat = item.studioLocations[0].lat
    //       let lon = item.studioLocations[0].lon
    //       console.log(item.name, lat, lon)
    //   }
    // });
    
  });


  beforeUpdate(() => {
    // console.log(widthContainer);
  });


  function handleClick(location){
    selectedLocation = location.name;
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
  
  .border {
    stroke: #9b9b9b;
    fill: none;
  }

</style>


<div id="network">
  <div>{selectedLocation}</div>
  <svg width ={width} height={height}>
    <g class="map">
      <path 
      d={bezirkePath} 
      class="border"
      />
    </g>
    <g class="circles">
      {#each locations as location}
        <circle 
          cx={projection([location.studioLocations[0].lon, location.studioLocations[0].lat])[0]} 
          cy={projection([location.studioLocations[0].lon, location.studioLocations[0].lat])[1]} 
          r="2" 
          stroke="black" 
          stroke-width="1" 
          fill="black" 
          on:click={() => handleClick(location)}
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

