<script>

import { onMount } from 'svelte';


import Intro from '../components/Intro.svelte';
import Controls from '../components/Controls.svelte';
import Viz from '../components/Viz.svelte';

import { VIEWMODE, COLORS } from '../store.js';
import { NETWORKDATA } from '../store.js';
import { WWIDTH } from '../store.js';

export let segment;

let nodes = $NETWORKDATA.nodes;
let width;

$: colorScheme = $VIEWMODE == "Day" ? $COLORS.day : $COLORS.night;
$: isMobileView = $WWIDTH < 768 ? true : false;

$: console.log($WWIDTH, isMobileView);


onMount(() => {
		console.log("App ready");
		
  });







</script>


<style lang="scss" global>
	 @import "./style/global.scss";

	 .link-list {
		 visibility: visible;
		 font-size: 0.001em;
		 color: transparent;
	 }

	  ul li {
		 display: inline;
	 }

	 .teaser-img {
		 display: block;
		 margin: 2em auto;
	 }
	
</style>


<main>

	{#if isMobileView}

		<div id="app-wrapper" style="background:{colorScheme.background};" bind:clientWidth={$WWIDTH}>

			<div style="background:{colorScheme.background}; color:{colorScheme.textDefault}">
				<h2 class="heading" style="color:{colorScheme.textHeading}">Artistellar</h2>
				<div style="color:{colorScheme.textDefault}">
					<em>Exploring Artists’ Networks</em>
				</div>
			
					<div style="color:{colorScheme.textDefault}">
					Artistellar is a portal into the life of contemporary artists living in Berlin. The site unpacks artists' motivations, their studio locations as well as their relationships with other artists working in various fields. The visualization  creates an inside view into the networks of selected artists presented on <a href="https://visitmytent.com/" target="_blank">visitmytent</a>.
					<br><br>
					Artistellar is optimized for iPad and Desktop. Please use a bigger screen. : )
					</div>

					<img class="teaser-img" srcset="network-map.png, network-map@2x.png 2x" src="network-map.png" alt="Network image">

					<div>Artistellar is a visualization by <a href="https://stephanieneumann.com/" target="_blank">Stephanie Neumann</a> and <a href="https://alsino.io" target="_blank">Alsino Skowronnek</a> crafted in Berlin, 2020.</div>
					
			</div>
		
		</div>

	{:else}

		<div id="app-wrapper" style="background:{colorScheme.background};" bind:clientWidth={$WWIDTH}>
			<Intro/>
			<Controls/>
			<Viz></Viz>
			<slot></slot>
		</div>

	{/if}

	
		<!-- Link list is hidden -->
		<ul class="link-list">
			{#each nodes as node}
				<li><a aria-current='{segment === node.name ? "page" : undefined}' href={node.slug}>{node.name}</a></li>
			{/each}
		</ul>




</main>




