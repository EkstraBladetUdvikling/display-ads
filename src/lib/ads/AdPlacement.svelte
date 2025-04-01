<script lang="ts">
	import { onMount } from "svelte";
	import { addPlacement } from "./util/addplacement";

  let { placementName, placementType } = $props();

  const targetId = `ad-${placementName}`;

  onMount(()=>{
    addPlacement(placementName, targetId);
  })
</script>

<div class="wrapper wrapper--{placementName} wrapper--{placementType}">
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
