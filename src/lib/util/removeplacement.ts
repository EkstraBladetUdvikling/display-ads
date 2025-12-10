import { BANNERSTATE } from '../state';

export function removePlacement(tagId: string, placementName?: string) {
	try {
		BANNERSTATE.placements = BANNERSTATE.placements.filter((p) => p !== placementName);

		if (window.lwhb && window.lwhb.removeAdUnit) window.lwhb.removeAdUnit(tagId);
	} catch (error) {
		console.error(`Error removing ad unit with tagId: ${tagId}`, error);
	}
}
