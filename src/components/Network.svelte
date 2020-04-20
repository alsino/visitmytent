<script>
  import { DATA } from '../store.js';
  import { onMount, beforeUpdate } from 'svelte';


  onMount(() => {
		console.log($DATA);
	});


</script>


<style lang="scss">
 @import "./style/theme.scss";

 h1 {
  color: $color-primary;
 }

</style>