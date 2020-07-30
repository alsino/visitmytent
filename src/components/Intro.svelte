<script>
  import { VIEWMODE, COLORS } from '../store.js';

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
   margin-bottom: $margin-small;
  //  width: 80%;
  //  width: 100%;
   transition: all 2s;
 }

 .row {
   display: flex;
   justify-content: flex-start;
 }

.column {
  flex: 0.3;
  margin-right: $margin-small * 1.5; 
}



</style>

<div style="background:{colorScheme.background}; color:{colorScheme.textDefault}">
  <h2 class="heading" style="color:{colorScheme.textHeading}">Artistellar &mdash;</h2>
  <div style="color:{colorScheme.textDefault}"><em>Exploring Artists’ Networks</em></div>
  <div class="row">
    <div class="column" style="color:{colorScheme.textDefault}">Artistellar visualizes studio locations as well as connections between contemporary artists working in various fields, creating an inside view into the networks of selected artists presented on <a href="https://visitmytent.com/" target="_blank">visitmytent</a>.</div>
    <div class="column" style="color:{colorScheme.textDefault}">Artistellar visualizes studio locations as well as connections between contemporary artists working in various fields, creating an inside view into the networks of selected artists presented on <a href="https://visitmytent.com/" target="_blank">visitmytent</a>.</div>
    <div class="column" style="color:{colorScheme.textDefault}">Artistellar visualizes studio locations as well as connections between contemporary artists working in various fields, creating an inside view into the networks of selected artists presented on <a href="https://visitmytent.com/" target="_blank">visitmytent</a>.</div>
   
    <!-- <div><em>Exploring Artists’ Networks</em> – Artistellar visualizes studio locations as well as connections between contemporary artists working in various fields, creating an inside view into the networks of selected artists presented on <a href="https://visitmytent.com/" target="_blank">visitmytent</a>. A visualization by <a href="https://stephanieneumann.com/" target="_blank">Stephanie Neumann</a> and <a href="https://visitmytent.com/?p=11325" target="_blank">Alsino Skowronnek</a> – Berlin, 2020.</div> -->
  </div>
   
</div>

