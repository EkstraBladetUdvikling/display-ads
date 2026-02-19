<script>
	import AdPlacement from './AdPlacement.svelte';

	let { consent, placementName, position = 'left' } = $props();
</script>

<div class="sidebanner-container">
	<div class="pushdownelement"></div>
	<div class="sidebanner sidebanner--{position}">
		{#if typeof consent === 'boolean'}
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
