<script>
	import { onMount } from 'svelte';
	import Intro from '../components/Intro.svelte';
	import Controls from '../components/Controls.svelte';
	import Viz from '../components/Viz.svelte';
	import { VIEWMODE, COLORS } from '../store.js';

	$: colorScheme = $VIEWMODE == "Day" ? $COLORS.day : $COLORS.night;

	onMount(() => {
});

	

</script>

<svelte:head>
	<title>Visitmytent network</title>
</svelte:head>


<!-- <div id="app-wrapper" style="background:{colorScheme.background};">
	<Intro/>
	<Controls/>
	<Viz/>
</div> -->


