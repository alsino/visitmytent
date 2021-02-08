<script>
  import { VIEWMODE, COLORS } from '../store.js';
  import { slide } from 'svelte/transition';
  import { NETWORKDATA } from '../store.js';


  let introVisible = false;
  let links = $NETWORKDATA.links;
  let nodes = $NETWORKDATA.nodes;

  $: colorScheme = $VIEWMODE == "Day" ? $COLORS.day : $COLORS.night;


  // $: console.log($VIEWMODE)

</script>


<style lang="scss">
 @import "./style/theme.scss";

 .heading {
  transition: all 1.5s;
 }

 div {
   color: $color-text;
   margin-top: 0;
   transition: all 1.5s;
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
  <h2 class="heading" style="color:{colorScheme.textHeading}">visitmyorbit</h2>
  <div style="color:{colorScheme.textDefault}">
    <em>Exploring Artists’ Networks</em>
    
  </div>

  {#if introVisible}
    <div class="row" in:slide="{{ y: 200, duration: 1000 }}" out:slide="{{ y: 200, duration: 1000 }}">
    <div class="column" style="color:{colorScheme.textDefault}">visitmyorbit is a portal into the life of contemporary artists working in various fields. The site shows artists' motivations, studio locations as well as {links.length} connections among them – creating an inside view into the networks of {nodes.length} artists presented on <a href="https://visitmytent.com/" target="_blank">visitmytent</a>.</div>
      
      <div class="column" style="color:{colorScheme.textDefault}">Highlighting individual artists points out their relation and closeness to other artists – socially in the network and physically on the map – giving a glimpse into the different artists' milieus – predominantly in Berlin. Once you're curious about an artist, you can dive into the respective</div>
      
      <div class="column" style="color:{colorScheme.textDefault}">studio visit and interview. All data was collected manually and evaluated in a constant dialogue with the artists over a period of more than one year. visitmyorbit is a visualization by <a href="https://stephanieneumann.com/" target="_blank">Stephanie Neumann</a> and <a target="_blank" href="https://alsino.io/">Alsino Skowronnek</a> crafted in Berlin, 2021.</div>
    </div>
    
  {/if}
  <div 
    class="toggle"
    style="color:{colorScheme.textDefault}"
    on:click={()=>{introVisible = !introVisible}}
    >{@html introVisible ?  "Hide info &#8593;" : "Show info &#8595;"}
    </div>
</div>
