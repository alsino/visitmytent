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
  

  onMount(() => {
    bezirkePath = path(bezirke);
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
  </svg>
</div>

<br>
Example: D3 w/ svelte
<div>https://svelte.dev/repl/01a5774b53e9416584428c025668407b?version=3.15.0</div>
<div>https://www.youtube.com/watch?time_continue=1&v=bnd64ZrHC0U&feature=emb_title</div>

<br>
<div>{JSON.stringify($NETWORKDATA)}</div>

