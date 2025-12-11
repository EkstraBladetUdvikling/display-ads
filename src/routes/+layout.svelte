<script lang="ts">
	import '$lib/ads.css';

	// @ts-ignore
	import CMP from '@ekstra-bladet/eb-cmp/svelte/CMP.svelte';
	import CMPUrl from '@ekstra-bladet/eb-cmp/dist/eb-cmp.js?url';
	import { setContext } from 'svelte';
	import { browser } from '$app/environment';
	import AdInit from '$lib/AdInit.svelte';
	import AdPlacement from '$lib/AdPlacement.svelte';
	import { PUBLIC_livewrappedKey } from '$env/static/public';
	import HalfpageContainer from '$lib/HalfpageContainer.svelte';
	import { DEVICE } from '$lib/state';

	let { children } = $props();

	let consent: 'unset' | boolean = 'unset';

	setContext('consent', () => consent);

	if (browser) {
		window.ebCMP.doWeHaveConsent({
			callback: (consentStatus: boolean) => {
				consent = consentStatus;
			},
			consentTo: 'iab'
		});
	}

	function adnamiUnloadHandler() {
		console.log('DISPLAY', 'unload handler');
	}
</script>

<svelte:head>
	<script src={CMPUrl}></script>
</svelte:head>

<CMP cbid="1f34e1cc-0bfc-4f89-a42d-841a0ae9133d" />
<AdInit {adnamiUnloadHandler} livewrappedKey={PUBLIC_livewrappedKey} />

<AdPlacement adMark={false} {consent} placementName="topscroll" placementType="topscroll" />

<div class="wrapper wrapper--outer">
	<nav>
		<a href="/">frontpage</a><a href="/other">Other</a><a href="/other-also">Yet anOther</a>
	</nav>
	<div class="wrapper sidebanners">
		<HalfpageContainer
			{consent}
			device={DEVICE.desktop}
			placementName="halfpage1"
			position="left"
		/>

		<div class="middle">
			{@render children()}
		</div>

		<HalfpageContainer
			{consent}
			device={DEVICE.desktop}
			placementName="halfpage2"
			position="right"
		/>
	</div>
</div>

<style>
	.middle {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 930px;
	}

	.wrapper {
		display: flex;
		flex-direction: row;
		margin: auto;
	}

	.wrapper--outer {
		flex-direction: column;
	}

	nav a {
		margin: 0 10px;
		text-decoration: none;
		color: #000;
	}
</style>
