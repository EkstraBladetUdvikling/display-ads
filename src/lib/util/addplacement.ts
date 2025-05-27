import { adsInterface } from '../init';
import { BANNERSTATE } from '../state';
import type { ICustomPlacement, IDefineTag, ILoadAdData } from '../types';

export function addCustomPlacement(customplacement: ICustomPlacement, byPassLW: boolean = false) {
	try {
		const { adUnitName, allowedMediaTypes, callbackMethod, invCode, gamSizes, sizes, tagId } =
			customplacement;

		if (!byPassLW && adUnitName && tagId) {
			window.lwhb.cmd.push(() => {
				const loadAdData: ILoadAdData = {
					adUnitName,
					callbackMethod,
					tagId
				};

				if (allowedMediaTypes) {
					loadAdData.allowedMediaTypes = allowedMediaTypes;
				}
				if (sizes) loadAdData.sizes = sizes;
				if (gamSizes) loadAdData.gamSizes = gamSizes;

				if (BANNERSTATE.renderCalled) {
					window.lwhb.loadAd(loadAdData);
				} else {
					window.lwhb.prepareAd(loadAdData);
				}
			});
		} else if (byPassLW && invCode && gamSizes && tagId) {
			window.googletag.cmd.push(() => {
				window.googletag.defineSlot(invCode, gamSizes, tagId).addService(window.googletag.pubads());

				window.googletag.enableServices();
				window.googletag.pubads().refresh();
			});
		} else {
			throw new Error('Wrong ad data');
		}
	} catch (error) {
		console.error({
			component: 'admanager.addCustomPlacement',
			message: (error as Error).message
		});
	}
}

export function addPlacement(placement: string, tagId: string, loadCallback?: () => void) {
	if (!adsInterface.placementExists(placement)) {
		console.warn(`Placement "${placement}" does not exist.`);
		return false;
	}
	console.log(
		`display-ads Adding placement: ${placement} with tagId: ${tagId}`,
		BANNERSTATE.placements
	);
	if (!BANNERSTATE.placements.includes(placement)) BANNERSTATE.placements.push(placement);

	BANNERSTATE.isReady(() => {
		const bannerData = BANNERSTATE.adUnits.find(
			(adUnit) => adUnit.cleanName?.toLowerCase() === placement
		);

		const adPlaceholder = document.getElementById(tagId);

		if (!adPlaceholder) throw new Error('adPlacement not found');

		while (adPlaceholder.firstChild) {
			adPlaceholder.firstChild.remove();
		}

		console.log(`display-ads Adding placement: ${placement} with tagId: ${tagId}`, bannerData);

		if (bannerData) {
			const { allowedFormats: allowedMediaTypes, lwName: adUnitName, gamSizes, sizes } = bannerData;

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
					window.lwhb.loadAd(loadAdData);
				} else {
					window.lwhb.prepareAd(loadAdData);
				}
			});
		}
	});
	return true;
}
