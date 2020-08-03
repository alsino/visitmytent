<script>
  import { VIEW, VIEWMODE } from '../store.js';
  import Select from 'svelte-select';
  import { onMount, beforeUpdate } from 'svelte';
  import { NETWORKDATA } from '../store.js';
  import { selectedArtistDetails, selectedArtist } from '../store.js';
  
  import { COLORS, LEGEND } from '../store.js';
  import { selectedDiscipline } from '../store.js';

  import { handleClear } from '../store.js';
  import { navigateToUrl } from '../store.js';

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
    navigateToUrl(false, selectedVal.detail.value);
  }

  $: getClassName = function(className){
      if ($VIEWMODE == "Day") {
       return className+"-bright"
        } else {
          return className+"-dark"
        }
    }
  

</script>

<style lang="scss">
  @import "./style/theme.scss";

.switch, .viewmode {
  flex: 0.3;
}

.legend-network {
  transition: all 2s;
  position: absolute;
  z-index: 1;
  top: 25em;
  width: 16em;
  font-size: 0.95em;
}

.legend-item {
  display: flex;
  align-items: center;
}

.legend-item svg {
 margin-right: $margin-small / 2;
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
  color: rgb(51,51,51);
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

  {#if $VIEW == "Network"}
    <div class="legend-network" style="color:{colorScheme.textDefault}">

      <div class="legend-item" style="color:{colorScheme.textDefault}">
        <svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="legend-circle" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Group" transform="translate(1.000000, 1.000000)" fill="{colorScheme.circleDefault}" fill-rule="nonzero" stroke="{colorScheme.circleOutline}">
                <circle id="Oval" cx="10" cy="10" r="10"></circle>
                <circle id="Oval" cx="10.3333333" cy="15" r="5"></circle>
                <circle id="Oval" cx="10.3333333" cy="18.3333333" r="1.66666667"></circle>
            </g>
          </g>
        </svg>
        <div>number of connections</div>
      </div>

      <div class="legend-item" style="color:{colorScheme.textDefault}">
        <svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="legend-line" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
              <line x1="3" y1="11.5" x2="20" y2="11.5" id="Path" stroke="{colorScheme.circleDefault}" fill-rule="nonzero"></line>
          </g>
        </svg>
        <div>exhibited/performed together</div>
      </div>
    </div>
  {/if}

  

</div>