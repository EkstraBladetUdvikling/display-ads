<script lang="ts">
	import { onDestroy } from 'svelte';

	import { beforeNavigate } from '$app/navigation';
	import { browser } from '$app/environment';

	import { addPlacement } from './util/addplacement';
	import { getElementIds } from './util';
	import { removePlacement } from './util/removeplacement';
	import { logger } from './logger';

	let {
		adMark = true,
		consent,
		placementName,
		placementType,
		wallpaperContainer = false
	} = $props();

	const { prefixId, targetId } = $derived(getElementIds(placementName));

	let showContainer = $state(false);

	let wallpaperBackground: HTMLDivElement;

	beforeNavigate(() => {
		if (browser && consent !== 'unset') {
			removePlacement(targetId, placementName);
			if (wallpaperContainer && wallpaperBackground) {
				while (wallpaperBackground.firstChild) {
					wallpaperBackground.removeChild(wallpaperBackground.firstChild);
				}
			}
		}
	});

	// afterNavigate(async () => {
	// 	if (browser && consent !== 'unset') {
	// 		logger(`adplacement.svelte ${placementName} afterNavigate consent:`, consent);

	// 		showContainer = await addPlacement({
	// 			consent: consent,
	// 			placement: placementName,
	// 			tagId: targetId
	// 		});
	// 	}
	// });

	onDestroy(() => {
		if (browser) removePlacement(targetId, placementName);
	});

	$effect(() => {
		if (!browser) return;
		if (consent !== 'unset') {
			logger(`adplacement.svelte ${placementName} effect consent:`, consent);
			addPlacement({
				consent: consent,
				placement: placementName,
				tagId: targetId
			}).then((result) => {
				showContainer = result;
			});
		}
	});
</script>

{#if wallpaperContainer}
	<div bind:this={wallpaperBackground} id="wallpaperBackground" class="wallpaper"></div>
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
