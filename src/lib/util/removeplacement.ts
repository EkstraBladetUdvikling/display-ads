export function removePlacement(tagId: string) {
	try {
		// console.log(`Removing ad unit with tagId: ${tagId}`, window.lwhb);
		if (window.lwhb && window.lwhb.removeAdUnit) window.lwhb.removeAdUnit(tagId);
	} catch (error) {
		console.error(`Error removing ad unit with tagId: ${tagId}`, error);
	}
}
