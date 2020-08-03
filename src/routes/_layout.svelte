<script>

import Intro from '../components/Intro.svelte';
import Controls from '../components/Controls.svelte';
import Viz from '../components/Viz.svelte';

import { NETWORKDATA, NETWORKCOORDINATES } from '../store.js';
import { selectedArtistDetails } from '../store.js';

let nodes = $NETWORKDATA.nodes;
export let segment;

import { VIEWMODE, COLORS } from '../store.js';

$: colorScheme = $VIEWMODE == "Day" ? $COLORS.day : $COLORS.night;

// $ : console.log($selectedArtistDetails)


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
	
</style>

<main>


	<div id="app-wrapper" style="background:{colorScheme.background};">
		<Intro/>
		<Controls/>
		{#if !$selectedArtistDetails}
			<Viz/>
		{/if}
	</div>

	<slot></slot>

		<ul class="link-list">
			{#each nodes as node}
				<li><a aria-current='{segment === node.name ? "page" : undefined}' href={node.slug}>{node.name}</a></li>
			{/each}
		</ul>

</main>




