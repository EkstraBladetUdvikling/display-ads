import { logger } from '../logger';
import { BANNERSTATE } from '../state';

export function removePlacement(tagId: string, placementName?: string) {
	try {
		logger(
			`removePlacement Removing ad unit with tagId: ${tagId}`,
			placementName,
			BANNERSTATE.placements
		);
		BANNERSTATE.placements = BANNERSTATE.placements.filter((p) => p !== placementName);
		logger('removePlacement Updated BANNERSTATE.placements:', BANNERSTATE.placements);
		if (window.lwhb && window.lwhb.removeAdUnit) window.lwhb.removeAdUnit(tagId);

		const bannerData = BANNERSTATE.adUnits.find(
			(adUnit) => adUnit.cleanName?.toLowerCase() === placementName
		);
		if (bannerData) bannerData.addedToQueue = false;

		const bannerDataNC = BANNERSTATE.adUnitsNoConsent.find(
			(adUnit) => adUnit.cleanName?.toLowerCase() === placementName
		);
		if (bannerDataNC) bannerDataNC.addedToQueue = false;
		logger('removePlacement Updated bannerData:', bannerData, bannerDataNC);
	} catch (error) {
		console.error(`Error removing ad unit with tagId: ${tagId}`, error);
	}
}
