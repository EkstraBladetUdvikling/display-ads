import { logger } from '../logger';
import { BANNERSTATE } from '../state';
import { getPlacementKey } from './getplacementkey';

export function removePlacement(tagId: string, placementName: string) {
	try {
		logger(
			`removePlacement Removing ad unit with tagId: ${tagId}`,
			placementName,
			BANNERSTATE.placements
		);

		const placementKey = getPlacementKey(placementName, tagId);

		BANNERSTATE.placements = BANNERSTATE.placements.filter((p) => p !== placementKey);
		logger('removePlacement Updated BANNERSTATE.placements:', BANNERSTATE.placements);
		if (window.lwhb && window.lwhb.removeAdUnit) window.lwhb.removeAdUnit(tagId);
	} catch (error) {
		console.error(`Error removing ad unit with tagId: ${tagId}`, error);
	}
}
