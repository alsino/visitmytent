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

  let artistCount = nodes.length;

  function handleSelect(selectedVal) {
    // console.log(selectedVal.detail.value);
    
    let result = nodes.filter(function(node) {
      return node.name == selectedVal.detail.value;
    })[0];

    selectedArtistDetails.set(result);
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
.controls {
  display: flex;
}

.switch, .viewmode {
  flex: 1;
}

.selector {
  flex: 1;
}

.disciplines {
  flex: 1;
  margin-left: 1rem;
  transition: all 2s;
  position: absolute;
  right: 8vw;
  z-index: 1;
  top: 30vh;
}

.disciplines label {
  display: block;
  cursor: pointer;
  margin-bottom: 0.3rem;
}

label {
  transition: color 2s, border-color 2s;
}

.switch label, .viewmode label {
  padding: 10px;
  cursor: pointer;
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
  border-bottom: 4px solid blue;
  color: blue;
}

.active-dark {
  border-bottom: 4px solid yellow;
  color: yellow;
}

.inactive-bright {
  color: black;
}

.inactive-dark {
  color: white;
}


</style>


<div class="controls">

  <div class="switch">
    <label class={ $VIEW == "Map" ? getClassName("active") : getClassName("inactive") }><input type=radio bind:group={$VIEW} value={"Map"}>Map</label>
    <label class={ $VIEW == "Network" ? getClassName("active") : getClassName("inactive") }><input type=radio bind:group={$VIEW} value={"Network"}>Network</label>
  </div>

    <div class="viewmode">
    <label class={ $VIEWMODE == "Day" ? getClassName("active") : getClassName("inactive")  }><input type=radio bind:group={$VIEWMODE} value={"Day"}>Day</label>
    <label class={ $VIEWMODE == "Night" ? getClassName("active") : getClassName("inactive") }><input type=radio bind:group={$VIEWMODE} value={"Night"}>Night</label>
  </div>
  

  <div class="selector">
    <Select items={artists}
    bind:selectedValue
		placeholder="{`Select one of ${artistCount} artists …`}"
		noOptionsMessage="No artist found"
    on:select={handleSelect} 
    on:clear={handleClear}
    ></Select>
  </div>

  <div class="disciplines" style="color:{colorScheme.textDefault}">
   {#each $LEGEND as discipline, index}
   <label class={ discipline.id == $selectedDiscipline ? getClassName("active") : getClassName("inactive") }><input type=radio bind:group={$selectedDiscipline} value={discipline.id} on:click={handleClear} >{ discipline.label }</label>
  {/each }
  </div>

</div>