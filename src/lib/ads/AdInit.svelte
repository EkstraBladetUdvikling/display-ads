<script lang="ts">
	import { getContext } from "svelte";
	import { adsInit, AdsInterface } from "./init";
	import { browser } from "$app/environment";


  const consentStatus = getContext('consent') as () => string | boolean;

  let adsInterface: AdsInterface;

  $effect(() => {
    if (browser) {
      if (consentStatus() !== 'unset' && !adsInterface) {
        adsInterface = new AdsInterface(consentStatus()) as AdsInterface;
      } else if (adsInterface){
        console.log('AdInit: No consent or already initialized');
        adsInterface.updateContext();
      }
    }
  });
</script>
