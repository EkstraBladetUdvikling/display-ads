<script lang="ts">
	import { onDestroy } from 'svelte';

	import { afterNavigate } from '$app/navigation';
	import { browser } from '$app/environment';

	import { addPlacement } from './util/addplacement';
	import { getElementIds } from './util';
	import { removePlacement } from './util/removeplacement';

	let { adMark = true, placementName, placementType, wallpaperContainer = false } = $props();

	const { prefixId, targetId } = getElementIds(placementName);

	let showContainer = $state(true);

	afterNavigate(() => {
		if (browser) {
			showContainer = addPlacement(placementName, targetId);
		}
	});

	onDestroy(() => {
		if (browser) removePlacement(targetId);
	});
</script>

{#if wallpaperContainer}
	<div id="wallpaperBackground"></div>
{/if}

<div
	hidden={!showContainer}
	class="wrapper wrapper--{placementName} wrapper--{placementType}"
	id={prefixId}
>
	{#if adMark}
		<div class="text">Annonce:</div>
	{/if}
	<div class="target target--{placementType} target--{placementName}" id={targetId}></div>
</div>

<style>
	.target {
		margin: auto;
	}

	.target:global(.target--topscroll),
	.wrapper:global(.wrapper--topscroll) {
		height: auto;
		margin: 0 auto;
		width: auto;
	}

	.wrapper :global(.target--halfpage) {
		height: 600px;
	}

	.wrapper :global(.target--halfpage1) {
		height: 600px;
		display: flex;
		justify-content: flex-end;
	}

	.text {
		font-size: 0.8rem;
		font-family: sans-serif;
		margin-bottom: 5px;
	}

	.wrapper--halfpage1 .text {
		text-align: right;
	}

	.wrapper :global(.target--megaboard) {
		height: 180px;
		width: 930px;
	}

	.wrapper :global(.target--monster) {
		height: 600px;
		width: 930px;
	}
</style>
