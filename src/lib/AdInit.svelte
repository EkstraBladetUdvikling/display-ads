<script lang="ts">
	import { browser } from '$app/environment';

	import { type AdsInterface, adsInterface as adsInterfaceFromFile } from './init';
	// import { DEVICE } from './state';
	import { page } from '$app/state';
	import { logger } from './logger';
	import { beforeNavigate } from '$app/navigation';

	let { adnamiUnloadHandler = undefined, consent, device } = $props();

	// const consentStatus = getContext('consent') as () => 'unset' | boolean;

	let adsInterface: AdsInterface = adsInterfaceFromFile;

	// afterNavigate(() => {
	// 	if (browser) {
	// 		const displayAds = page.data?.displayAds;
	// 		const device = matchMedia('(min-width: 768px)').matches ? DEVICE.desktop : DEVICE.smartphone;
	// 		displayAds.device = device;
	// 		if (consentStatus() !== 'unset') {
	// 			console.log('DISPLAY','displayads init?');
	// 			adsInterface.init(displayAds, consentStatus(), adnamiUnloadHandler);
	// 		}
	// 	}
	// });
	beforeNavigate(() => {
		if (adsInterface) adsInterface.cleanup();
	});

	$effect(() => {
		logger('AdInit.svelte *******************************************************************');
		logger('AdInit.svelte consentStatus:', consent);
		if (!browser) return;
		const displayAds = page.data?.displayAds;
		if (!displayAds) {
			console.error('displayAds is not defined in page data');
			return;
		}
		// const device = matchMedia('(min-width: 768px)').matches ? DEVICE.desktop : DEVICE.smartphone;
		displayAds.device = device;

		if (consent !== 'unset') {
			adsInterface.init(displayAds, consent as boolean, adnamiUnloadHandler);
		}
	});
</script>
