<script>
    
    import { onMount } from 'svelte';
    import { SPLITTING } from '../store.js';
    import { MOUSE } from '../store.js';




    onMount(() => {
        
        Splitting();
    });

</script>


<style lang="scss">


  @keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}

* {
	box-sizing: border-box;
}

body {
	font-family: 'Helvetica', sans-serif;
}

.text {
  width: 0px;
  height: 0px;
  position: absolute;
  pointer-events: none;
  display: block;
  background-color: white;
}


:global(.char) {
	--i: calc(100% / (var(--char-total) + 1));
	position: absolute;
	offset-path: path('M225.5.5c124.3 0 225 100.7 225 225s-100.7 225-225 225S.5 349.8.5 225.5 101.2.5 225.5.5');
	offset-distance: calc(var(--i) * var(--char-index));
    offset-anchor: top;
	// padding-top: 4rem;
    // animation: spin 5s infinite linear;


    // --i: calc(50% / var(--char-total));
    // --offset: calc(var(--char-index) * 2rem);
	// offset-path: path('M.4 84.1s127.4 188 267.7 0 247.3 0 247.3 0');
    // // offset-path: path('M85,270 C103.666667,127.333333 175,56 299,56 C423,56 487.333333,-8.33333333 492,-137');
    // // offset-path: path('M1,71.0815104 C27.587339,22.7671327 51.9206723,-0.56620067 74,1.08151035 C107.118992,3.55307688 136.481364,44.0474073 135,81.0815104 C133.518636,118.115613 87.0424633,145.640807 68,151.08151 C48.9575367,156.522214 33.5543834,134.946656 30,111.08151 C26.4456166,87.2163645 41.929186,65.2651131 54,57.0815104 C66.070814,48.8979076 84.809116,62.9092866 89,71.0815104 C93.190884,79.2537341 78.9844861,93.0552152 74,96.0815104 C70.6770092,98.0990405 66.3436759,95.4323738 61,88.0815104');
	// offset-distance: var(--offset);
	// position: absolute;
	// animation: move 1500ms alternate infinite forwards var(--delay, 0ms);

}


@keyframes move {
	100% {
		--i: 2rem;
		offset-distance: calc(var(--offset) + 12rem);
	}
}

</style>



<div 
    data-splitting  
    class="text" 
    style="top: {$MOUSE.y + 10}px; left:{$MOUSE.x + 10}px;"
    >The best moment is when I don‘t think too much about it.
  </div>



