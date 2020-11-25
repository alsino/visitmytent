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

  import Circle from '../components/Circle.svelte';


  export let artist;
  let textWidth = 500;
  let textHeight = 500;

  $: colorScheme = $VIEWMODE == "Day" ? $COLORS.day : $COLORS.night;
  $: console.log($selectedArtistDetails);



  let startName = nodesWithLinks.filter((item) => {
      return item.slug == artist;
    })[0].name;

  onMount(() => {
    // console.log(startName);
    $selectedArtist = startName;
  });

</script>


<ArtistInfo/>


{#if $selectedArtistDetails}
  <!-- <Circle /> -->
 
  {#if $selectedArtistDetails.questions}
    <div 
      class="text" 
      style="top: {$MOUSE.y -150}px; left:{$MOUSE.x - 150}px; width:{textWidth}px; height:{textHeight}px; color:{colorScheme.circleSelected};"
      >
      {$selectedArtistDetails.questions.why}
    </div>
  {/if}
{/if}



<style lang="scss">


  * {
    box-sizing: border-box;
  }
  
  
  .text {
      font-size: 1em;
      position: absolute;
      pointer-events: none;
      display: block;
      background-color: transparent;
  }
  

  
  </style>





