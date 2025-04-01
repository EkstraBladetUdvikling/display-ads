<script lang="ts">
	import { onDestroy } from "svelte";

	import { afterNavigate } from "$app/navigation";
	import { browser } from "$app/environment";

  import { addPlacement } from "./util/addplacement";
	import { getElementIds } from "./util";
	import { removePlacement } from "./util/removeplacement";

  let { placementName, placementType } = $props();

  const {prefixId,targetId} = getElementIds(placementName);

  afterNavigate(() => {
    console.log('MYADS AdPlacement afterNavigate: ', placementName, targetId, browser);
    if (browser) {
      addPlacement(placementName, targetId);
    }
  });

  onDestroy(() => {
    console.log('MYADS AdPlacement onDestroy: ', placementName, targetId);
    if (browser) removePlacement(targetId);
  });


</script>

<div class="wrapper wrapper--{placementName} wrapper--{placementType}" id="{prefixId}">
  <div class="text">Annonce:</div>
  <div class="target {placementType} {placementName}" id={targetId}></div>
</div>

<style>
  .target {
    width: 300px;
    height: 250px;
    background-color: #f0f0f0;
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
</style>
