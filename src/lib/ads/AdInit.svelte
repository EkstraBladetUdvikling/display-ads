<script lang="ts">
	import { getContext } from "svelte";
	import { AdsInterface } from "./init";
	import { browser } from "$app/environment";
	import { afterNavigate } from "$app/navigation";

  const consentStatus = getContext('consent') as () => string | boolean;

  let adsInterface: AdsInterface;

  afterNavigate(() => {
    if (browser) {
      if (consentStatus() !== 'unset' && !adsInterface) {
        console.log('MYADS AdInit ???? ');
        adsInterface = new AdsInterface(consentStatus()) as AdsInterface;
      } else if (adsInterface) {
        console.log('MYADS AdInit: ', adsInterface);
        adsInterface.updateContext();
      }
    }
  });
</script>
