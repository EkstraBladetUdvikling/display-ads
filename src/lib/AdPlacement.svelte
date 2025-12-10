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
		placementName,
		placementType,
		wallpaperContainer = false
	} = $props();

	const { prefixId, targetId } = getElementIds(placementName);

	let showContainer = $state(false);

	const consentStatus = $derived(consent);

	afterNavigate(() => {
		if (browser && consentStatus !== 'unset') {
			removePlacement(targetId, placementName);
			if (wallpaperContainer && wallpaperBackground) {
				while (wallpaperBackground.firstChild) {
					wallpaperBackground.removeChild(wallpaperBackground.firstChild);
				}
			}

			showContainer = addPlacement({
				consent,
				placement: placementName,
				tagId: targetId
			});
		}
	});

	// onMount(() => {
	// 	if (consentStatus !== 'unset') {
	// 		showContainer = addPlacement({ consent, placement: placementName, tagId: targetId });
	// 	}
	// });

	onDestroy(() => {
		if (browser) removePlacement(targetId);
	});

	let wallpaperBackground: HTMLDivElement;
	$effect(() => {
		if (!browser) return;
		if (consentStatus !== 'unset') {
			showContainer = addPlacement({
				consent,
				placement: placementName,
				tagId: targetId
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
