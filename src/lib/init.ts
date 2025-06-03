import BannerHandler, { handleHalfPage } from './bannerhandler';
import { DEVICE } from './state';
import { PAGETYPES } from './types/admanager';

function handleAdnami(adnamiUnloadHandler?: () => void) {
	/**
	 * Adnami integration
	 */
	window.adsm = window.adsm || {};
	window.adsm.pageSettings = window.adsm.pageSettings || {};
	window.adsm.pageSettings.skinMaxScrollDepth = 2200;

	const MACRO_UNLOAD = 'ADSM_MACRO_UNLOAD';
	const adnmEventHandler = (() => {
		let onMacroUnload = function (_type: string, _source: MessageEventSource | null) {};
		function handler(event: MessageEvent) {
			if (event.data && event.data.type && event.data.type === MACRO_UNLOAD) {
				onMacroUnload(event.data.payload, event.source);
			}
		}

		window.addEventListener('message', handler, false);

		function connect(_type: string, callback: () => void) {
			onMacroUnload = callback;
		}

		return {
			connect: connect
		};
	})();

	const adnamiUnload = () => {
		if (adnamiUnloadHandler) {
			adnamiUnloadHandler();
		}
		window.jppolWallpaper();
	};

	adnmEventHandler.connect(MACRO_UNLOAD, adnamiUnload);
}

interface IDisplayAdsData {
	adPlacements: any[];
	anonIds: { adform: string; base: string; google: string };
	device: DEVICE;
	highImpactEnabled: boolean;
	keywords: { [id: string]: string | string[] };
	livewrappedKey: string;
	pageContext: PAGETYPES;
	userType: string;
}

interface IAdsInterfaceInitData {
	displayAdsData?: IDisplayAdsData;
	consent?: string | boolean;
	adnamiUnloadHandler?: () => void;
}

export class AdsInterface {
	#exists = false;
	#initData: IAdsInterfaceInitData = {};
	private bannerHandler: BannerHandler | null = null;

	public init(displayAdsData: any, consent: string | boolean, adnamiUnloadHandler?: () => void) {
		if (!displayAdsData) return;
		this.#initData = {
			displayAdsData,
			consent,
			adnamiUnloadHandler
		};
		if (this.#exists) {
			console.warn('displayads AdsInterface already initialized, skipping re-initialization.');
			const newData =
				this.#initData.displayAdsData &&
				JSON.stringify(this.#initData.displayAdsData) === JSON.stringify(displayAdsData);
			console.log('display-ads AdsInterface already initialized, newData:', newData);
			const newConsent = this.#initData.consent && this.#initData.consent === consent;
			console.log('display-ads AdsInterface already initialized, newConsent:', newConsent);
			this.updateContext(displayAdsData);
			return;
		}

		console.log('display-ads', displayAdsData);
		const disallowedSection = '';

		if (!consent && disallowedSection) return null;

		const extractedData = this.extractHandlerData(displayAdsData);

		/**
		 * Handling wallpapers from other sources
		 */
		window.jppolWallpaper = (callFunx?: string) => {
			const wallpaper = document.getElementById('wallpaperBackground');
			if (!wallpaper) return;
			wallpaper.dataset.wallpaper = String(true);
			if (window.jppolApn.endStickyMegaboard) window.jppolApn.endStickyMegaboard();
			handleHalfPage(true, callFunx, extractedData.pageContext === PAGETYPES.FRONTPAGE);
		};

		window.jppolApn = {
			endStickyMegaboard: () => {
				console.log('endStickyMegaboard');
				// const wrapperEl = document.getElementById('${wrapperId}');
				// const megaboardContainer = document.getElementById('megaboardContainer');
				// megaboardContainer.classList.remove('megaboard-follow');
				// megaboardContainer.classList.remove('megaboard-following');
				// if (wrapperEl) {
				// 	wrapperEl.classList.remove('stickywrapper');
				// }
				// const bannerEl = document.getElementById('${targetId}');
				// if (bannerEl) {
				// 	bannerEl.classList.remove('stickybanner');
				// }
			},
			ebSkyskraper: {
				topscroll: function () {
					// only exists for external purposes
				},
				wallpaper: function () {
					window.jppolWallpaper();
				}
			}
		};

		window.lwhb = window.lwhb || { cmd: [], disableAdServerScriptLoad: true };

		const firstScript = document.querySelector('script');
		const lwScript = document.createElement('script');
		lwScript.src = `//lwgadm.com/lw/pbjs?pid=${extractedData.livewrappedKey}`;
		if (firstScript && firstScript.parentNode) {
			firstScript.parentNode.insertBefore(lwScript, firstScript);
		}

		const gptScript = document.createElement('script');
		gptScript.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
		if (firstScript && firstScript.parentNode) {
			firstScript.parentNode.insertBefore(gptScript, firstScript);
		}

		if (extractedData.highImpactEnabled) {
			const hiScript = document.createElement('script');
			hiScript.src = '/highimpact/highimpact.min.js';
			if (firstScript && firstScript.parentNode) {
				firstScript.parentNode.insertBefore(hiScript, firstScript);
			}
		}

		if (extractedData.adNamiEnabled) handleAdnami(adnamiUnloadHandler);

		this.bannerHandler = new BannerHandler(extractedData);
		this.#exists = true;
	}

	public placementExists(placement: string, consent: boolean) {
		console.log(
			'display-ads placementExists Checking if placement exists:',
			placement,
			'consent',
			consent
		);
		if (!this.bannerHandler) return false;

		console.log(
			'display-ads placementExists Checking if placement exists bannerhandler exists:',
			this.bannerHandler.adUnits,
			this.bannerHandler.adUnitsNoConsent
		);

		const adUnitsToSearch = consent
			? this.bannerHandler.adUnits
			: this.bannerHandler.adUnitsNoConsent;

		console.log(
			'display-ads placementExists Checking if placement exists bannerhandler exists: adUnitsToSearch',
			adUnitsToSearch
		);
		return adUnitsToSearch.find((adUnit) => {
			return adUnit.cleanName?.toLowerCase() === placement;
		});
	}

	public updateContext(displayAdsData) {
		const extractedData = this.extractHandlerData(displayAdsData);
		console.log('display-ads Updating context with extracted data:', extractedData);
		this.bannerHandler?.updateContext(extractedData);
	}

	private extractHandlerData(displayAds) {
		const {
			adNamiEnabled,
			adPlacements,
			anonIds,
			articleId,
			device,
			segments,
			highImpactEnabled,
			livewrappedKey,
			pageContext,
			premium,
			keywords,
			prebidEidsAllowed,
			reloadOnBack,
			userType
		} = displayAds;
		console.log('display-ads Extracting handler data from page state . pageContext', pageContext);
		return {
			adNamiEnabled,
			adPlacements,
			anonIds,
			articleId,
			device,
			segments,
			highImpactEnabled,
			livewrappedKey,
			pageContext,
			premium,
			keywords,
			prebidEidsAllowed,
			reloadOnBack,
			userType
		};
	}
}

export const adsInterface = new AdsInterface();
