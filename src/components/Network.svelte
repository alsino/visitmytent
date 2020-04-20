<script>
  import { DATA } from '../store.js';
  import { onMount, beforeUpdate } from 'svelte';
  import * as d3 from "d3";


  onMount(() => {
    console.log($DATA);
  });
  
</script>


<style lang="scss">
 @import "./style/theme.scss";

 #network {
   width: 100%;
   height: 600px;
   background: $color-primary;
   margin-top: $margin-small;
 }

</style>
<br>
Example: D3 w/ svelte
<div>https://svelte.dev/repl/01a5774b53e9416584428c025668407b?version=3.15.0</div>
<div id="network">Network here</div>

