<script lang="ts">
	import { getContext } from 'svelte';

	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';

	import { type AdsInterface, adsInterface as adsInterfaceFromFile } from './init';
	import { DEVICE } from './state';
	import { page } from '$app/state';

	let { adnamiUnloadHandler = undefined } = $props();

	const consentStatus = getContext('consent') as () => string | boolean;

	let adsInterface: AdsInterface = adsInterfaceFromFile;

	afterNavigate(() => {
		if (browser) {
			const displayAds = page.data?.displayAds;
			const device = matchMedia('(min-width: 768px)').matches ? DEVICE.desktop : DEVICE.smartphone;
			displayAds.device = device;
			if (consentStatus() !== 'unset') {
				adsInterface.init(displayAds, consentStatus(), adnamiUnloadHandler);
			} else if (adsInterface) {
				adsInterface.updateContext(displayAds);
			}
		}
	});

	$effect(() => {
		const displayAds = page.data?.displayAds;
		const device = matchMedia('(min-width: 768px)').matches ? DEVICE.desktop : DEVICE.smartphone;
		displayAds.device = device;
		console.log('hekko? displayAds.device', displayAds);
		adsInterface.updateContext(displayAds);
		console.log('hekko? consentStatus()', consentStatus());
	});
</script>
