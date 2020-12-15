<script>

import Intro from '../components/Intro.svelte';
import Controls from '../components/Controls.svelte';
import Viz from '../components/Viz.svelte';

import { VIEWMODE, COLORS } from '../store.js';
import { NETWORKDATA } from '../store.js';
import { WWIDTH } from '../store.js';

export let segment;

let nodes = $NETWORKDATA.nodes;
$: colorScheme = $VIEWMODE == "Day" ? $COLORS.day : $COLORS.night;
$: isMobileView = $WWIDTH < 768 ? true : false;

$: console.log($WWIDTH, isMobileView);







</script>


<style lang="scss" global>
	 @import "./style/global.scss";

	//  #app-wrapper {
		 
	//  }

	 .link-list {
		 visibility: visible;
		 font-size: 0.001em;
		 color: transparent;
	 }

	  ul li {
		 display: inline;
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
					Artistellar visualizes studio locations as well as connections between contemporary artists working in various fields, creating an inside view into the networks of selected artists presented on <a href="https://visitmytent.com/" target="_blank">visitmytent</a>.<br><br>
					Highlighting individual artists points out their relation and closeness to other artists – socially in the network and physically on the map – giving a glimpse into the different artists' milieus – predominantly in Berlin.<br><br>
					Once you're curious about an artist, you can dive into the respective studio visit and interview. Artistellar is a visualization by <a href="https://stephanieneumann.com/" target="_blank">Stephanie Neumann</a> and <a href="https://visitmytent.com/?p=11325" target="_blank">Alsino Skowronnek</a> crafted in Berlin, 2020.
					</div>
					
				
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




