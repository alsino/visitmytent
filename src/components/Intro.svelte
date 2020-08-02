<script>
  import { VIEWMODE, COLORS } from '../store.js';
  import { slide } from 'svelte/transition';

  let introVisible = true;

  $: colorScheme = $VIEWMODE == "Day" ? $COLORS.day : $COLORS.night;

  $: console.log($VIEWMODE)

</script>


<style lang="scss">
 @import "./style/theme.scss";

 .heading {
  transition: all 2s;
 }

 div {
   color: $color-text;
   margin-top: 0;
   transition: all 2s;
 }

.toggle {
  text-transform: uppercase;
  font-size: 0.7em;
  margin: 1em 0 2em 0;
  cursor: pointer;
}

.toggle:hover {
  font-style: italic; 
}





</style>

<div style="background:{colorScheme.background}; color:{colorScheme.textDefault}">
  <h2 class="heading" style="color:{colorScheme.textHeading}">Artistellar</h2>
  <div style="color:{colorScheme.textDefault}">
    <em>Exploring Artists’ Networks</em>
    
  </div>

  {#if introVisible}
    <div class="row" in:slide="{{ y: 200, duration: 1000 }}" out:slide="{{ y: 200, duration: 1000 }}">
      <div class="column" style="color:{colorScheme.textDefault}">Artistellar visualizes studio locations as well as connections between contemporary artists working in various fields, creating an inside view into the networks of selected artists presented on <a href="https://visitmytent.com/" target="_blank">visitmytent</a>.</div>
      
      <div class="column" style="color:{colorScheme.textDefault}">Highlighting individual artists points out their relation and closeness to other artists – socially in the network and physically on the map – giving a glimpse into the different artists' milieus.</div>
      
      <div class="column" style="color:{colorScheme.textDefault}">Once you're curious about an artist, you can dive into the respective studio visit and interview. Artistellar is a visualization by <a href="https://stephanieneumann.com/" target="_blank">Stephanie Neumann</a> and <a href="https://visitmytent.com/?p=11325" target="_blank">Alsino Skowronnek</a> crafted in Berlin, 2020.</div>
    </div>
    
  {/if}
  <div 
    class="toggle"
    style="color:{colorScheme.textDefault}"
    on:click={()=>{introVisible = !introVisible}}
    >{@html introVisible ?  "Hide info &#8593;" : "Show info &#8595;"}
    </div>
</div>


