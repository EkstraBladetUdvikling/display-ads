export function removePlacement(tagId: string) {
	console.log(`Removing ad unit with tagId: ${tagId}`, window.lwhb);
	if (window.lwhb) window.lwhb.removeAdUnit(tagId);
}
