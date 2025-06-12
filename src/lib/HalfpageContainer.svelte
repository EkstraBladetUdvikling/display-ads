<script>
	import AdPlacement from './AdPlacement.svelte';

	let { consent, pageId, placementName, position = 'left' } = $props();
</script>

<div class="sidebanner-container">
	<div class="pushdownelement"></div>
	<div class="sidebanner sidebanner--{position}">
		<AdPlacement
			adMark={true}
			{consent}
			{pageId}
			{placementName}
			placementType="halfpage"
			wallpaperContainer={false}
		/>
	</div>
</div>
