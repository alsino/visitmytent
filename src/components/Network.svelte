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
  

  onMount(() => {
    bezirkePath = path(bezirke);

    // let locationLat = locations[0].studioLocations[0].lat;
    // let locationLon = locations[0].studioLocations[0].lon;

    // console.log(locationLat, locationLon)
    // console.log(projection([locationLon, locationLat])[0])
  });


  beforeUpdate(() => {
    // console.log(widthContainer);
  });
  
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
  
  .border {
    stroke: #9b9b9b;
    fill: none;
  }

</style>



<div id="network">
  <svg width ={width} height={height}>
    <path d={bezirkePath} class="border"/>
    <g>
      {#each locations as location}
        <circle 
          cx={projection([location.studioLocations[0].lon, location.studioLocations[0].lat])[0]} 
          cy={projection([location.studioLocations[0].lon, location.studioLocations[0].lat])[1]} 
          r="4" stroke="black" 
          stroke-width="1" 
          fill="black" />
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

