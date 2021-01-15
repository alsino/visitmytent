<script>
import { onMount } from 'svelte';
import { NETWORKDATA } from '../store.js';

export let segment;

let nodes = $NETWORKDATA.nodes;

// onMount(() => {
// 		console.log("App ready");
// });

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
		<slot></slot>
	</main>
	

	
	<!-- Link list is hidden -->
	<ul class="link-list">
		{#each nodes as node}
			<li><a aria-current='{segment === node.name ? "page" : undefined}' href={node.slug}>{node.name}</a></li>
		{/each}
	</ul>











