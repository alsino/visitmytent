<script>
  import { VIEWMODE, COLORS } from '../store.js';
  import { slide } from 'svelte/transition';

  let introVisible = true;

  $: colorScheme = $VIEWMODE == "Day" ? $COLORS.day : $COLORS.night;

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

 .row {
   display: flex;
   justify-content: flex-start;
   position: relative;
 }

.column {
  flex: 0.3;
  margin-right: $margin-small * 1.5; 
}

.toggle {
  text-transform: uppercase;
  color: $color-primary;
  font-size: 0.7em;
  margin: 1em 0;
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
      <div class="column" style="color:{colorScheme.textDefault}">Artistellar visualizes studio locations as well as connections between contemporary artists working in various fields, creating an inside view into the networks of selected artists presented on <a href="https://visitmytent.com/" target="_blank">visitmytent</a>.</div>
      <div class="column" style="color:{colorScheme.textDefault}">Artistellar visualizes studio locations as well as connections between contemporary artists working in various fields, creating an inside view into the networks of selected artists presented on <a href="https://visitmytent.com/" target="_blank">visitmytent</a>.</div>
    </div>
    
  {/if}
  <div 
    class="toggle"
    on:click={()=>{introVisible = !introVisible}}
    >{introVisible ?  "Hide info" : "Show info"}
    </div>
   
</div>

<!-- <div><em>Exploring Artists’ Networks</em> – Artistellar visualizes studio locations as well as connections between contemporary artists working in various fields, creating an inside view into the networks of selected artists presented on <a href="https://visitmytent.com/" target="_blank">visitmytent</a>. A visualization by <a href="https://stephanieneumann.com/" target="_blank">Stephanie Neumann</a> and <a href="https://visitmytent.com/?p=11325" target="_blank">Alsino Skowronnek</a> – Berlin, 2020.</div> -->

