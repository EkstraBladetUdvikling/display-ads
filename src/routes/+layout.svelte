<script lang="ts">
	// @ts-ignore
	import CMP from '@ekstra-bladet/eb-cmp/svelte/CMP.svelte';
	import CMPUrl from '@ekstra-bladet/eb-cmp/dist/eb-cmp.js?url';
	import { setContext } from 'svelte';
	import { browser } from '$app/environment';

  let { children } = $props();

  let consent = 'unset';

  setContext('consent', () => consent);

  if (browser) {
    window.ebCMP.doWeHaveConsent({
      callback: (consentStatus) => {
        console.log('consent', consentStatus);
        consent = consentStatus;
      },
      consentTo: 'iab',
    })
  }
</script>

<svelte:head>
	<script src={CMPUrl}></script>
</svelte:head>

<CMP cbid="1f34e1cc-0bfc-4f89-a42d-841a0ae9133d" />

{@render children()}
