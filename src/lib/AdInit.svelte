<script lang="ts">
	import { getContext } from "svelte";

  import { browser } from "$app/environment";
	import { afterNavigate } from "$app/navigation";

	import { type AdsInterface, adsInterface as adsInterfaceFromFile } from "./init";

  let {adnamiUnloadHandler = undefined, livewrappedKey} = $props();

  const consentStatus = getContext('consent') as () => string | boolean;

  let adsInterface: AdsInterface = adsInterfaceFromFile;

  afterNavigate(() => {
    if (browser) {
      if (consentStatus() !== 'unset') {
        adsInterface.init(consentStatus(),livewrappedKey,adnamiUnloadHandler);
      } else if (adsInterface) {
        adsInterface.updateContext();
      }
    }
  });
</script>
