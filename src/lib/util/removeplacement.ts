export function removePlacement(tagId: string) {
	if (window.lwhb) window.lwhb.removeAdUnit(tagId);
}
