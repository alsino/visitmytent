<script>
  import { VIEW } from '../store.js';
  import Select from 'svelte-select';
  import { onMount, beforeUpdate } from 'svelte';
  import { NETWORKDATA } from '../store.js';
  import { selectedArtistDetails } from '../store.js';
  
  let nodes = $NETWORKDATA.nodes;
  let artists = nodes.map(item => {return item.name }).sort();
  let selectedValue;

  let artistCount = nodes.length;

  beforeUpdate(() => {

    if ($selectedArtistDetails) {
       console.log($selectedArtistDetails)
       selectedValue = $selectedArtistDetails.name;
    }

    
  });

  function handleSelect(selectedVal) {
    
    let result = nodes.filter(function(node) {
      return node.name == selectedVal.detail.value;
    })[0];

    selectedArtistDetails.set(result);
  }

  function handleClear() {
    selectedArtistDetails.set("");
  }


</script>

<style>
.controls {
  display: flex;
}

.switch {
  flex: 1;
}

.selector {
  flex: 1;
}

</style>


<div class="controls">

  <div class="switch">
    <label><input type=radio bind:group={$VIEW} value={"Network"}>Network</label>
    <label><input type=radio bind:group={$VIEW} value={"Map"}>Map</label>
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