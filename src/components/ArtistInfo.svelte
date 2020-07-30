<script>
  import { VIEW, LEGEND } from '../store.js';
  import { selectedArtistDetails } from '../store.js';
</script>

<style lang="scss">
  @import "./style/theme.scss";

  #artist-info {
    position: absolute;
    right: 3em;
    width: 300px;
  }

  .portrait {
    margin-top: $margin-small;
    height: 300px;
  }


  @media (max-width: 1024px) {
  #artist-info {
    left: 0em;
    // right: 0.6px
  }
}

</style>

{#if $selectedArtistDetails}

  <div id="artist-info">

    {#if $selectedArtistDetails.imageUrl}
        <div>
          <img class="portrait" src="images/{$selectedArtistDetails.imageUrl}" alt="Image of {$selectedArtistDetails.name}">
        </div>
    {/if}

    {#if $selectedArtistDetails.name}
       <div>{$selectedArtistDetails.name}</div>
    {/if}

    {#if $selectedArtistDetails.discipline}
      {#each $selectedArtistDetails.discipline as discipline, i}
      <div>{$LEGEND.filter(d => {return d.id == discipline})[0].label}</div>
      {/each }
    {/if}    

    <div>
      {#if $selectedArtistDetails.birthTown || $selectedArtistDetails.birthCountry || $selectedArtistDetails.birthYear }
         <span>Born in </span>
      {/if}
      
      {#if $selectedArtistDetails.birthTown}
          <span>{$selectedArtistDetails.birthTown}, </span>
      {/if}

      {#if $selectedArtistDetails.birthCountry}
          <span>{$selectedArtistDetails.birthCountry}</span>
      {/if}

      {#if $selectedArtistDetails.birthYear}
          <span>in {$selectedArtistDetails.birthYear}</span>
      {/if}     
    </div>

    {#if $selectedArtistDetails.studioLocations}
          <div>Studio in {$selectedArtistDetails.studioVisit}</div>
    {/if}

    

    {#if $selectedArtistDetails.profileID}
      <div><a target="_blank" href="https://visitmytent.com/?p={$selectedArtistDetails.profileID}">Open artist profile</a></div>
    {/if}
    
</div>
{/if}


