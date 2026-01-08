<script>
	import AdPlacement from '$lib/AdPlacement.svelte';

	const adMark = false;
	const consent = true;
	const wallpaperContainer = false;
</script>

<AdPlacement
	{adMark}
	{consent}
	placementName={'swedishtakeover1'}
	placementType={'swedishtakeover'}
	{wallpaperContainer}
/>
