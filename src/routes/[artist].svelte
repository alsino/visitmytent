<script context="module">
  export function preload(page){
    return {
      artist: page.params.artist,
    };
  }
</script>

<script>
  import { onMount } from 'svelte';
  import ArtistInfo from '../components/ArtistInfo.svelte';   
  import { nodesWithLinks } from '../store.js';
  import { selectedArtist } from '../store.js';
  
  export let artist;

  let startName = nodesWithLinks.filter((item) => {
      return item.slug == artist;
    })[0].name;

  onMount(() => {
    console.log(startName);
    $selectedArtist = startName;
  });

</script>

<ArtistInfo/>





