<script>
    
    import { onMount } from 'svelte';
    import { SPLITTING } from '../store.js';
    import { MOUSE } from '../store.js';
	import { VIEWMODE, COLORS } from '../store.js';


    $: colorScheme = $VIEWMODE == "Day" ? $COLORS.day : $COLORS.night;



    let textWidth = 300;
    let textHeight = 300;

    let buttonPusehd = false;

    $: handleClick = function() {
        console.log("clicked");
        textWidth = 500;
        textHeight = 500;
    }




    onMount(() => {
        
        Splitting();
    });

</script>


<style lang="scss">


* {
	box-sizing: border-box;
}


.text {
    font-size: 1em;
    // font-style: italic;
    transition: width 2s, height 2s;
    position: absolute;
    pointer-events: none;
    display: block;
    background-color: transparent;
    animation: spin 120s infinite linear;
}


:global(.char) {
    --units: 1;
    --l: calc(var(--char-total) + 1);
	--rotationUnit: calc((1turn / var(--l)) * var(--char-index, 1));
	transform: rotate(var(--rotationUnit));
	transform-origin: center;
	width: calc(100% - 2rem);
	height: calc(100% - 2rem);
	top: 1rem;
	left: 1rem;
	text-align: center;
	// Required to override splitting.js styles
	display: block !important;
	position: absolute !important;
    color: rgb(20, 23, 238);
    color: #D56285;
    color: yellow;
    color: red;
	
	&::before,
	&::after {
		display: none;
	}

}



@keyframes spin {
    0%, 100% {
        transform:rotate(0deg) scale(1, 1);
        // transform:scale(1, 1);
    }
    50% {
        transform:rotate(-360deg) scale(1.2, 1.2);
        // transform:scale(2, 2);
    }
}


// @keyframes move {
// 	100% {
// 		--i: 2rem;
// 		offset-distance: calc(var(--offset) + 12rem);
// 	}
// }

</style>


<div 
    data-splitting  
    class="text" 
    style="top: {$MOUSE.y -150}px; left:{$MOUSE.x - 150}px; width:{textWidth}px; height:{textHeight}px"
    >Because - I - do - not - have - time - to - do - something - else.
</div>



<button on:click={handleClick}>test</button>


  <!-- <h1 data-splitting>
	Text in a circle with Splitting
</h1> -->



