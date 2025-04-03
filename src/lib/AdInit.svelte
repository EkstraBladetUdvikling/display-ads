<script lang="ts">
	import { getContext } from "svelte";

  import { browser } from "$app/environment";
	import { afterNavigate } from "$app/navigation";

	import { AdsInterface } from "./init";

  let {adnamiUnloadHandler = undefined} = $props();

  const consentStatus = getContext('consent') as () => string | boolean;

  let adsInterface: AdsInterface;

  afterNavigate(() => {
    if (browser) {
      if (consentStatus() !== 'unset' && !adsInterface) {
        adsInterface = new AdsInterface(consentStatus(),adnamiUnloadHandler) as AdsInterface;
        console.log('adsInterface', adsInterface);
      } else if (adsInterface) {
        adsInterface.updateContext();
      }
    }
  });
</script>
