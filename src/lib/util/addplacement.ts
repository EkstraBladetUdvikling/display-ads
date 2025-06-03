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

interface IAddPlacementInput {
	placement: string;
	tagId: string;
	loadCallback?: () => void;
	consent: boolean;
	device: string;
}

export function addPlacement(options: IAddPlacementInput) {
	//placement: string, tagId: string, loadCallback?: () => void) {
	const { placement, tagId, loadCallback, consent, device } = options;
	console.log(
		`display-ads addPlacement: ${placement} with tagId: ${tagId}, consent: ${consent}, device: ${device}`
	);
	// if (!adsInterface.placementExists(placement, consent)) {
	// 	console.warn(`Placement "${placement}" does not exist.`);
	// 	return false;
	// }

	if (!BANNERSTATE.placements.includes(placement)) BANNERSTATE.placements.push(placement);

	BANNERSTATE.isReady(() => {
		const useNoConsent = window.ebCMP.noConsentGroup();
		console.log('display-ads addPlacement useNoConsent:', useNoConsent);
		const adUnitsToSearch = useNoConsent ? BANNERSTATE.adUnitsNoConsent : BANNERSTATE.adUnits;
		const bannerData = adUnitsToSearch.find(
			(adUnit) => adUnit.cleanName?.toLowerCase() === placement
		);

		console.log(
			`display-ads addPlacement Searching for placement: ${placement} in adUnits:`,
			adUnitsToSearch,
			bannerData
		);
		if (!bannerData) {
			console.log(`Placement "${placement}" does not exist.`);
			throw new Error(`Placement "${placement}" does not exist.`);
		}

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
