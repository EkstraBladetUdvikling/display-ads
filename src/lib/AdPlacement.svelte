<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	import { afterNavigate } from '$app/navigation';
	import { browser } from '$app/environment';

	import { addPlacement } from './util/addplacement';
	import { getElementIds } from './util';
	import { removePlacement } from './util/removeplacement';

	let {
		adMark = true,
		consent,
		device,
		placementName,
		placementType,
		wallpaperContainer = false
	} = $props();

	const { prefixId, targetId } = getElementIds(placementName);

	let showContainer = $state(false);

	afterNavigate(() => {
		if (browser) {
			console.log(`display-ads AdPlacement: afterNavigate placement ${placementName}`);
			showContainer = addPlacement({ consent, device, placement: placementName, tagId: targetId });
		}
	});

	// onMount(() => {
	// 	console.log(`display-ads AdPlacement: Mounting placement ${placementName}`);
	// 	showContainer = addPlacement({ consent, device, placement: placementName, tagId: targetId });
	// });

	onDestroy(() => {
		console.log(`display-ads AdPlacement.svelte: Destroying placement ${placementName}`);
		if (browser) removePlacement(targetId);
	});
</script>

{#if wallpaperContainer}
	<div id="wallpaperBackground"></div>
{/if}

<div
	hidden={!showContainer}
	class="placement-wrapper placement-wrapper--{placementName} placement-wrapper--{placementType}"
	id={prefixId}
>
	{#if adMark}
		<div class="placement-text">Annonce:</div>
	{/if}
	<div
		class="placement-target placement-target--{placementType} placement-target--{placementName}"
		id={targetId}
	></div>
</div>
