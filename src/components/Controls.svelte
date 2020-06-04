<script>
  import { VIEW, VIEWMODE } from '../store.js';
  import Select from 'svelte-select';
  import { onMount, beforeUpdate } from 'svelte';
  import { NETWORKDATA } from '../store.js';
  import { selectedArtistDetails, selectedArtist } from '../store.js';
  import { handleClear } from '../store.js';
  
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

.active {
  border-bottom: 4px solid blue;
  color: blue;
}


</style>


<div class="controls">

  <div class="switch">
    <label class={$VIEW == "Network"? "active" : ""}><input type=radio bind:group={$VIEW} value={"Network"}>Network</label>
    <label class={$VIEW == "Map"? "active" : ""}><input type=radio bind:group={$VIEW} value={"Map"}>Map</label>
  </div>

    <div class="viewmode">
    <label class={$VIEWMODE == "Day"? "active" : ""}><input type=radio bind:group={$VIEWMODE} value={"Day"}>Day</label>
    <label class={$VIEWMODE == "Night"? "active" : ""}><input type=radio bind:group={$VIEWMODE} value={"Night"}>Night</label>
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

</div>