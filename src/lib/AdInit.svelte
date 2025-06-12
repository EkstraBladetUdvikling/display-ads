<script lang="ts">
	import { getContext } from 'svelte';

	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';

	import { type AdsInterface, adsInterface as adsInterfaceFromFile } from './init';
	import { DEVICE } from './state';
	import { page } from '$app/state';

	let { adnamiUnloadHandler = undefined, pageId } = $props();

	const consentStatus = getContext('consent') as () => 'unset' | boolean;

	let adsInterface: AdsInterface = adsInterfaceFromFile;

	// afterNavigate(() => {
	// 	if (browser) {
	// 		const displayAds = page.data?.displayAds;
	// 		const device = matchMedia('(min-width: 768px)').matches ? DEVICE.desktop : DEVICE.smartphone;
	// 		displayAds.device = device;
	// 		if (consentStatus() !== 'unset') {
	// 			console.log('displayads init?');
	// 			adsInterface.init(displayAds, consentStatus(), adnamiUnloadHandler);
	// 		}
	// 	}
	// });

	$effect(() => {
		if (!browser) return;
		console.log('AdInit effect triggered', pageId);
		console.log('--------------17----');
		// if (pageId === oldPageId) {
		// 	console.log('No change in pageId, skipping ad initialization');
		// 	return;
		// }
		const displayAds = page.data?.displayAds;
		if (!displayAds) {
			console.error('displayAds is not defined in page data');
			return;
		}
		const device = matchMedia('(min-width: 768px)').matches ? DEVICE.desktop : DEVICE.smartphone;
		displayAds.device = device;

		if (consentStatus() !== 'unset') {
			adsInterface.init(displayAds, consentStatus() as boolean, adnamiUnloadHandler);
		}
	});
</script>
