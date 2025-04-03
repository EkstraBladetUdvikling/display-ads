<script lang="ts">
	// @ts-ignore
	import CMP from '@ekstra-bladet/eb-cmp/svelte/CMP.svelte';
	import CMPUrl from '@ekstra-bladet/eb-cmp/dist/eb-cmp.js?url';
	import { setContext } from 'svelte';
	import { browser } from '$app/environment';
	import AdInit from '$lib/AdInit.svelte';
	import AdPlacement from '$lib/AdPlacement.svelte';
	import { PUBLIC_livewrappedKey } from '$env/static/public';

  let { children } = $props();

  let consent: 'unset' | boolean = 'unset';

  setContext('consent', () => consent);

  if (browser) {
    window.ebCMP.doWeHaveConsent({
      callback: (consentStatus: boolean) => {
        consent = consentStatus;
      },
      consentTo: 'iab',
    })
  }

  function adnamiUnloadHandler() {
    console.log('unload handler');
  }
</script>

<svelte:head>
	<script src={CMPUrl}></script>
</svelte:head>

<CMP cbid="1f34e1cc-0bfc-4f89-a42d-841a0ae9133d" />
<AdInit {adnamiUnloadHandler} livewrappedKey={PUBLIC_livewrappedKey} />

<AdPlacement adMark={false} placementName="topscroll" placementType="topscroll" />

<div class="wrapper wrapper--outer">
  <nav><a href="/">frontpage</a><a href="/other">Other</a><a href="/other-also">Yet anOther</a></nav>
  <div class="wrapper">

    <AdPlacement placementName="halfpage1" placementType="halfpage" />

    <div class="middle">
      {@render children()}
    </div>

    <AdPlacement placementName="halfpage2" placementType="halfpage" />

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
    align-items: center;
    margin: auto
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
