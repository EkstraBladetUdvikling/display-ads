<script lang="ts">

  import { page } from '$app/state';
	import AdInit from '$lib/ads/AdInit.svelte';

  const adPlacements = page.data.adPlacements;

  console.log('adPlacements', adPlacements);



</script>

<AdInit pageContext={'forside'} />
<h1>Ad test</h1>

<div class="ads" data-placement="halfpage1"></div>

<style>
  .ads {
    width: 300px;
    height: 250px;
    background-color: #f0f0f0;
    margin: 10px;
  }
</style>
