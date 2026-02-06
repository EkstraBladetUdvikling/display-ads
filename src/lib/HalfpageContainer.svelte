<script>
	import AdPlacement from './AdPlacement.svelte';

	let { consent, placementName, position = 'left' } = $props();
</script>

<div class="sidebanner-container">
	<div class="pushdownelement"></div>
	<div class="sidebanner sidebanner--{position}">
		{#if typeof consent === 'boolean'}
			added after consent change {consent}
			<AdPlacement
				adMark={true}
				{consent}
				{placementName}
				placementType="halfpage"
				wallpaperContainer={false}
			/>
		{/if}
	</div>
</div>
