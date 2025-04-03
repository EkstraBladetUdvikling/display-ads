<script lang="ts">
	import { onDestroy } from "svelte";

	import { afterNavigate } from "$app/navigation";
	import { browser } from "$app/environment";

  import { addPlacement } from "./util/addplacement";
	import { getElementIds } from "./util";
	import { removePlacement } from "./util/removeplacement";

  let {adMark = true, placementName, placementType } = $props();

  const {prefixId,targetId} = getElementIds(placementName);

  afterNavigate(() => {
    if (browser) {
      addPlacement(placementName, targetId);
    }
  });

  onDestroy(() => {
    if (browser) removePlacement(targetId);
  });
</script>

<div  class="wrapper wrapper--{placementName} wrapper--{placementType}" id="{prefixId}">
  {#if adMark}
  <div class="text">Annonce:</div>
  {/if}
  <div class="target {placementType} {placementName}" id={targetId}></div>
</div>

<style>
  .target {
    width: 300px;
    height: 250px;
    background-color: #f0f0f0;

  }
  .target:global(.topscroll),
    .wrapper:global(.wrapper--topscroll) {
    height: auto;
    margin: 0 auto;
    width: auto;
  }

  .wrapper:global(.wrapper--halfpage) {
    margin: 0 10px;
  }

  .wrapper :global(.halfpage) {
    height: 600px;
  }

  .wrapper :global(.halfpage1) {
    height: 600px;
    display: flex;
    justify-content: flex-end;
  }

  .text {
    font-size: .8rem;
    font-family: sans-serif;
    margin-bottom: 5px;
  }

  .wrapper--halfpage1 .text {
    text-align: right;
  }

.wrapper :global(.megaboard) {
  height: 180px;
  width: 930px;
}

  .wrapper :global(.monster) {
    height: 600px;
    width: 930px;
  }
</style>
