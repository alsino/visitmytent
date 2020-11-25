<script context="module">
  export function preload(page){
    return {
      artist: page.params.artist,
    };
  }
</script>

<script>
  import { onMount } from 'svelte';
  import { MOUSE } from '../store.js';
  import ArtistInfo from '../components/ArtistInfo.svelte';   
  import { nodesWithLinks } from '../store.js';
  import { selectedArtist, selectedArtistDetails } from '../store.js';
  import { VIEWMODE, COLORS } from '../store.js';


  export let artist;

  let textWidth = 300;
  let textHeight = 500;

  $: colorScheme = $VIEWMODE == "Day" ? $COLORS.day : $COLORS.night;
  $: console.log($selectedArtistDetails);



  let startName = nodesWithLinks.filter((item) => {
      return item.slug == artist;
    })[0].name;

  onMount(() => {
    // console.log(startName);
    $selectedArtist = startName;


    // BLOTTER - Example 2
    let text = new Blotter.Text("observation", {
      family : "'EB Garamond', serif",
      size : 27,
      fill : "#171717",
      paddingLeft : 40,
      paddingRight : 40
    });

    let material = new Blotter.LiquidDistortMaterial();

    // Play with the value for uSpeed. Lower values slow
    // down animation, while higher values speed it up. At
    // a speed of 0.0, animation is stopped entirely.
    material.uniforms.uSpeed.value = 0.25;

    // Try uncommenting the following line to play with
    // the "volatility" of the effect. Higher values here will
    // produce more dramatic changes in the appearance of your
    // text as it animates, but you will likely want to keep
    // the value below 1.0.
    // material.uniforms.uVolatility.value = 0.30;

    let blotter = new Blotter(material, {
      texts : text
    });

    let elem = document.getElementById("plain-text");
    let scope = blotter.forText(text);

    scope.appendTo(elem);


  });




</script>


<ArtistInfo/>


<!-- {#if $selectedArtistDetails}
 
  {#if $selectedArtistDetails.questions}
    <div 
      id="text" 
      style="top: {$MOUSE.y - 30}px; left:{$MOUSE.x}px; width:{textWidth}px; height:{textHeight}px; color:{colorScheme.circleSelected};"
      >
      {$selectedArtistDetails.questions.why}
    </div>
  {/if}
{/if} -->


<div 
id="plain-text"
style="top: {$MOUSE.y - 30}px; left:{$MOUSE.x}px; width:{textWidth}px; height:{textHeight}px; color:{colorScheme.circleSelected};"
></div>





<style lang="scss">


  * {
    box-sizing: border-box;
  }

  #plain-text {
      font-size: 1em;
      position: absolute;
      pointer-events: none;
      display: block;
      background-color: transparent;
  }
  
  
  .text {
      font-size: 1em;
      position: absolute;
      pointer-events: none;
      display: block;
      background-color: transparent;
  }
  

  
  </style>





