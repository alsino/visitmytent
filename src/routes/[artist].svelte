<script context="module">
  export function preload(page){
    return {
      artist: page.params.artist,
    };
  }
</script>

<script>
  import { onMount, beforeUpdate } from 'svelte';
  import { MOUSE } from '../store.js';
  import ArtistInfo from '../components/ArtistInfo.svelte';   
  import { nodesWithLinks } from '../store.js';
  import { selectedArtist, selectedArtistDetails } from '../store.js';
  import { VIEWMODE, COLORS } from '../store.js';

  export let artist;

  
  let text1, text2, text3;
  let elem1, elem2, elem3;
  let scope1, scope2, scope3;
  let material;
  let blotter;
  let textSize = 34;
  

  $: colorScheme = $VIEWMODE == "Day" ? $COLORS.day : $COLORS.night;

  let startName = nodesWithLinks.filter((item) => {
      return item.slug == artist;
    })[0].name;

  let startDetails = nodesWithLinks.filter((item) => {
    return item.slug == artist;
  })[0];


  beforeUpdate(() => {

    // if ($selectedArtist == "Van Bo Le-Mentzel") {
    if ($selectedArtist) {

      if ($selectedArtistDetails.questions.why[0] != "*") {

        if (text1 && text2 && text3) {
          text1.value = $selectedArtistDetails.questions.why[0];
          text1.properties.fill = colorScheme.textQuote;
          text1.needsUpdate = true;

          text2.value = $selectedArtistDetails.questions.why[1];
          text2.needsUpdate = true;

          text3.value = $selectedArtistDetails.questions.why[2];
          text3.needsUpdate = true;

        } 

      } else {
          text1.value = ":)";
          text1.needsUpdate = true;

          text2.value = "";
          text2.needsUpdate = true;

          text3.value = "";
          text3.needsUpdate = true;

        }

    }

    
  })


  $: styleProperties = {
        family : "'EB Garamond', serif",
        size : textSize,
        fill : colorScheme.textQuote,
        paddingLeft : 40,
        paddingRight : 40
    };


  onMount(() => {
    $selectedArtist = startName;
    $selectedArtistDetails = startDetails;

    text1 = new Blotter.Text("", styleProperties);
    text2 = new Blotter.Text("", styleProperties);
    text3 = new Blotter.Text("", styleProperties);

    
    material = new Blotter.LiquidDistortMaterial();

    // Play with the value for uSpeed. Lower values slow
    // down animation, while higher values speed it up. At
    // a speed of 0.0, animation is stopped entirely.
    material.uniforms.uSpeed.value = 0.2;

    // Try uncommenting the following line to play with
    // the "volatility" of the effect. Higher values here will
    // produce more dramatic changes in the appearance of your
    // text as it animates, but you will likely want to keep
    // the value below 1.0.
    material.uniforms.uVolatility.value = 0.03;

    blotter = new Blotter(material, {
      texts : [text1, text2, text3]
    });

    elem1 = document.getElementById("plain-text");
    elem2 = document.getElementById("plain-text-2");
    elem3 = document.getElementById("plain-text-3");
  
    scope1 = blotter.forText(text1);
    scope1.appendTo(elem1);

    scope2 = blotter.forText(text2);
    scope2.appendTo(elem2);

    scope3 = blotter.forText(text3);
    scope3.appendTo(elem3);

  });


</script>


<ArtistInfo/>


  <div 
  id="plain-text"
  style="top: {$MOUSE.y - textSize * 3}px; left:{$MOUSE.x}px;"
  ></div>

  <div 
  id="plain-text-2"
  style="top: {$MOUSE.y - textSize * 2}px; left:{$MOUSE.x}px;"
  ></div>

  <div 
  id="plain-text-3"
  style="top: {$MOUSE.y - textSize}px; left:{$MOUSE.x}px;"
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
      width: 500px;
  }

  #plain-text-2 {
      font-size: 1em;
      position: absolute;
      pointer-events: none;
      display: block;
      background-color: transparent;
      width: 500px;
  }

  #plain-text-3 {
      font-size: 1em;
      position: absolute;
      pointer-events: none;
      display: block;
      background-color: transparent;
      width: 500px;
  }
  
  
  .text {
      font-size: 1em;
      position: absolute;
      pointer-events: none;
      display: block;
      background-color: transparent;
  }
  

  
  </style>





