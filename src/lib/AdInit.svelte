<script lang="ts">
	import { getContext } from 'svelte';

	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';

	import { type AdsInterface, adsInterface as adsInterfaceFromFile } from './init';

	let { adnamiUnloadHandler = undefined } = $props();

	const consentStatus = getContext('consent') as () => string | boolean;

	let adsInterface: AdsInterface = adsInterfaceFromFile;

	afterNavigate(() => {
		if (browser) {
			if (consentStatus() !== 'unset') {
				adsInterface.init(consentStatus(), adnamiUnloadHandler);
			} else if (adsInterface) {
				adsInterface.updateContext();
			}
		}
	});

	$effect(() => {
		adsInterface.updateContext();
	});
</script>
