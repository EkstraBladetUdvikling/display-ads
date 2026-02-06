import { logger } from '../logger';
import { adsInterface } from '../init';
import { BANNERSTATE } from '../state';
import type { IDefineTag, ILoadAdData } from '../types';

interface IAddPlacementInput {
	consent: boolean;
	loadCallback?: () => void;
	placement: string;
	tagId: string;
}

export async function addPlacement(options: IAddPlacementInput) {
	const { placement, tagId, loadCallback, consent } = options;
	logger('addPlacement called with:', placement, tagId, consent);
	try {
		const existsAndAllowed = await adsInterface.placementExistsAndAllowed(placement, consent);
		if (!existsAndAllowed) {
			throw new Error(`Placement "${placement}" does not exist.`);
		}

		if (!BANNERSTATE.placements.includes(placement)) BANNERSTATE.placements.push(placement);

		BANNERSTATE.isReady(() => {
			const useNoConsent = consent === false;

			const adUnitsToSearch = useNoConsent ? BANNERSTATE.adUnitsNoConsent : BANNERSTATE.adUnits;
			logger('addPlacement: adUnitsToSearch:', adUnitsToSearch);
			const bannerData = adUnitsToSearch.find(
				(adUnit) => adUnit.cleanName?.toLowerCase() === placement
			);

			if (!bannerData) {
				throw new Error(`Placement "${placement}" does not have banner data.`);
			}

			const adPlaceholder = document.getElementById(tagId);

			if (!adPlaceholder) throw new Error('adPlacement not found');

			while (adPlaceholder.firstChild) {
				adPlaceholder.firstChild.remove();
			}
			if (bannerData) {
				const {
					addedToQueue,
					allowedFormats: allowedMediaTypes,
					lwName: adUnitName,
					gamSizes,
					sizes
				} = bannerData;
				logger('addPlacement called with:', placement, 'addedToQueue', addedToQueue);

				if (!addedToQueue) {
					window.lwhb.cmd.push(() => {
						const loadAdData: ILoadAdData = {
							adUnitName,
							tagId
						};
						if (loadCallback) loadAdData.callbackMethod = loadCallback;

						if (allowedMediaTypes) {
							const lowercasedMediaTypes = allowedMediaTypes.map((str) =>
								str.toLowerCase()
							) as IDefineTag['allowedFormats'];
							loadAdData.allowedMediaTypes = lowercasedMediaTypes;
						}
						if (sizes) loadAdData.sizes = sizes;
						if (gamSizes) loadAdData.gamSizes = gamSizes;

						if (BANNERSTATE.renderCalled) {
							logger('addPlacement: Loading ad for placement:', placement, tagId, loadAdData);
							window.lwhb.loadAd(loadAdData);
						} else {
							logger('addPlacement: preparing ad for placement:', placement, tagId, loadAdData);
							window.lwhb.prepareAd(loadAdData);
						}
					});
					bannerData.addedToQueue = true;
				}
			}
		});
		return true;
	} catch (error) {
		console.warn('addPlacement error:', error);
		return false;
	}
}
