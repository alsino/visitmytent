<script>
  import { VIEW, VIEWMODE } from '../store.js';
  import Select from 'svelte-select';
  import { onMount, beforeUpdate } from 'svelte';
  import { NETWORKDATA } from '../store.js';
  import { selectedArtistDetails, selectedArtist } from '../store.js';
  import { handleClear } from '../store.js';
  import { COLORS, LEGEND } from '../store.js';
  import { selectedDiscipline } from '../store.js';

  $: colorScheme = $VIEWMODE == "Day" ? $COLORS.day : $COLORS.night;
  let getClassName;
  
  let nodes = $NETWORKDATA.nodes;
  let artists = nodes.map(item => {return item.name }).sort();

  $: selectedValue = $selectedArtist;
  // $: console.log($selectedArtist, $selectedArtistDetails);

  let artistCount = nodes.length;

  $: handleSelect = function(selectedVal) {
    // console.log(selectedVal.detail.value);
    
    let result = nodes.filter(function(node) {
      return node.name == selectedVal.detail.value;
    })[0];

    selectedArtistDetails.set(result);
    selectedArtist.set(selectedVal.detail.value);
  }

  $: getClassName = function(className){
      if ($VIEWMODE == "Day") {
       return className+"-bright"
        } else {
          return className+"-dark"
        }
    }

  

</script>

<style>

.switch, .viewmode {
  flex: 0.3;
}

.netlegend {
  transition: all 2s;
  position: absolute;
  z-index: 1;
  top: 26em;
  width: 16em;

}


.disciplines {
  transition: all 2s;
  position: absolute;
  /* right: 13vw; */
  z-index: 1;
  top: 5em;
}


.disciplines label {
  display: block;
  cursor: pointer;
  margin-bottom: 0.3rem;
  /* text-transform: uppercase; */
  font-size: 0.95em;
}

label {
  transition: color 2s, border-color 2s;
}

label:hover {
  font-style: italic;
}


.switch label, .viewmode label {
  padding: 5px;
  cursor: pointer;
  /* text-transform: uppercase; */
  font-size: 0.95em;
}

.switch input[type="radio"] {
  display: none;
}

.viewmode input[type="radio"] {
  display: none;
}

.disciplines input[type="radio"] {
  display: none;
}

.active-bright {
  border-bottom: 1px solid blue;
  color: blue;
}

.active-dark {
  border-bottom: 1px solid yellow;
  color: yellow;
}

.inactive-bright {
  color: black;
}

.inactive-dark {
  color: white;
}

@media (max-width: 1024px) {
  .disciplines {
    right: 2em;
  }

  .selectContainer {
    margin-left: 2em;
  }
}


</style>


<div class="row">

<div class="selector column">
    <Select items={artists}
    bind:selectedValue
		placeholder="{`Select one of ${artistCount} artists …`}"
		noOptionsMessage="No artist found"
    on:select={handleSelect} 
    on:clear={handleClear}
    ></Select>
  </div>

  <div class="switch column">
    <label class={ $VIEW == "Map" ? getClassName("active") : getClassName("inactive") }><input type=radio bind:group={$VIEW} value={"Map"}>&#8857; Map</label>
    <label class={ $VIEW == "Network" ? getClassName("active") : getClassName("inactive") }><input type=radio bind:group={$VIEW} value={"Network"}>&#9903; Network</label>
  </div>

    <div class="viewmode column">
    <label class={ $VIEWMODE == "Day" ? getClassName("active") : getClassName("inactive")  }><input type=radio bind:group={$VIEWMODE} value={"Day"}>&#x25CF; Day</label>
    <label class={ $VIEWMODE == "Night" ? getClassName("active") : getClassName("inactive") }><input type=radio bind:group={$VIEWMODE} value={"Night"}>&#9900; Night</label>
  </div>
  

  

  <div class="disciplines column" style="color:{colorScheme.textDefault}">
   {#each $LEGEND as discipline, index}
   <label class={ discipline.id == $selectedDiscipline ? getClassName("active") : getClassName("inactive") }><input type=radio bind:group={$selectedDiscipline} value={discipline.id} on:click={handleClear} >{ discipline.label }</label>
  {/each }
  </div>


  <div class="netlegend" style="color:{colorScheme.textDefault}">
    <label style="color:{colorScheme.circleDefault}">&#x25CF </label>size depends on number of connections <br />
    <label style="color:{colorScheme.circleDefault}">–</label> artists exhibited/performed together

  </div>

</div>