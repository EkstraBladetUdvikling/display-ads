<script>
	import AdPlacement from './AdPlacement.svelte';

	let { placementName, position = 'left' } = $props();
</script>

<div class="sidebanner-container">
	<div class="pushdownelement"></div>
	<div class="sidebanner sidebanner--{position}">
		<AdPlacement
			adMark={true}
			{placementName}
			placementType="halfpage"
			wallpaperContainer={false}
		/>
	</div>
</div>
