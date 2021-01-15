<script>
	import { onMount } from 'svelte';

	import Intro from '../components/Intro.svelte';
	import Controls from '../components/Controls.svelte';
	import Viz from '../components/Viz.svelte';

	import { VIEWMODE, COLORS } from '../store.js';
	import { WWIDTH } from '../store.js';

	let loaded = false;
	let isMobileView;

	$: colorScheme = $VIEWMODE == "Day" ? $COLORS.day : $COLORS.night;


onMount(() => {
		loaded = true;
		isMobileView = window.innerWidth < 768 ? true : false;
	});

</script>


<svelte:head>
	<title>Visitmytent network</title>
</svelte:head>



{#if loaded }

	<div id="app-wrapper" style="background:{colorScheme.background};">

		{#if isMobileView }
	
			<div style="background:{colorScheme.background}; color:{colorScheme.textDefault}">
				<h2 class="heading" style="color:{colorScheme.textHeading}">visitmyorbit</h2>
				<div style="color:{colorScheme.textDefault}">
					<em>Exploring Artists’ Networks</em>
				</div>
			
					<div style="color:{colorScheme.textDefault}">
						visitmyorbit is a portal into the life of contemporary artists living in Berlin. The site unpacks artists' motivations, their studio locations as well as their connections among them. The visualization creates an inside view into the networks of selected artists working in various fields presented on <a href="https://visitmytent.com/" target="_blank">visitmytent</a>.
					<br><br>
					<span style="font-style: italic;">visitmyorbit is optimized for tablet and desktop. Please use a bigger screen. : )</span>
					</div>
			
					<img class="teaser-img" srcset="network.png, network@2x.png 2x" src="network.png" alt="Network image">
			
					<div>visitmyorbit is a visualization by <a href="https://stephanieneumann.com/" target="_blank">Stephanie Neumann</a> and <a href="https://alsino.io" target="_blank">Alsino Skowronnek</a> crafted in Berlin, 2021.</div>
					
			</div>

		{:else }

			<Intro/>
			<Controls/>
			<Viz></Viz>
			<slot></slot>

		{/if}
		
	</div>

{/if}