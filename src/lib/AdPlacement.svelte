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
		pageId,
		placementName,
		placementType,
		wallpaperContainer = false
	} = $props();

	const { prefixId, targetId } = getElementIds(placementName, pageId);

	let showContainer = $state(false);

	const consentStatus = $derived(consent);

	let wallpaperContainerElement: HTMLDivElement | null = null;
	afterNavigate(() => {
		if (browser && consentStatus !== 'unset') {
			cleanupWallpaper();
			showContainer = addPlacement({
				consent,
				placement: placementName,
				tagId: targetId
			});
		}
	});

	onMount(() => {
		if (consentStatus !== 'unset') {
			showContainer = addPlacement({ consent, placement: placementName, tagId: targetId });
		}
	});

	const cleanupWallpaper = () => {
		if (wallpaperContainerElement) {
			while (wallpaperContainerElement.firstChild) {
				wallpaperContainerElement.removeChild(wallpaperContainerElement.firstChild);
				wallpaperContainerElement.dataset.wallpaper = 'false';
				wallpaperContainerElement.removeAttribute('style');
			}
		}
	};

	onDestroy(() => {
		if (browser) {
			removePlacement(targetId);
			cleanupWallpaper();
		}
	});

	$effect(() => {
		if (!browser) return;
		cleanupWallpaper();
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
	<div bind:this={wallpaperContainer} id="wallpaperBackground" class="wallpaper"></div>
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
