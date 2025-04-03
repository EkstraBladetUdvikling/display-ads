import { page } from '$app/state';
import BannerHandler from './bannerhandler';

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

	if (adnamiUnloadHandler) adnmEventHandler.connect(MACRO_UNLOAD, adnamiUnloadHandler);
}

export class AdsInterface {
	private bannerHandler: BannerHandler | null = null;

	public init(consent: string | boolean, livewrappedKey: string, adnamiUnloadHandler?: () => void) {
		const disallowedSection = '';

		if (!consent && disallowedSection) return null;

		window.lwhb = window.lwhb || { cmd: [], disableAdServerScriptLoad: true };

		const firstScript = document.querySelector('script');
		const lwScript = document.createElement('script');
		lwScript.src = `//lwgadm.com/lw/pbjs?pid=${livewrappedKey}`;
		if (firstScript && firstScript.parentNode) {
			firstScript.parentNode.insertBefore(lwScript, firstScript);
		}

		const gptScript = document.createElement('script');
		gptScript.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
		if (firstScript && firstScript.parentNode) {
			firstScript.parentNode.insertBefore(gptScript, firstScript);
		}

		const { adNamiEnabled } = page.data.displayAds;

		const extractedData = this.extractHandlerData();

		if (adNamiEnabled) handleAdnami(adnamiUnloadHandler);

		this.bannerHandler = new BannerHandler(extractedData);
	}

	public placementExists(placement: string) {
		return this.bannerHandler?.adUnits.find((adUnit) => {
			return adUnit.cleanName?.toLowerCase() === placement;
		});
	}

	public updateContext() {
		const extractedData = this.extractHandlerData();

		this.bannerHandler?.updateContext(extractedData);
	}

	private extractHandlerData() {
		const {
			adPlacements,
			anonIds,
			articleId,
			device,
			segments,
			highImpactEnabled,
			pageContext,
			premium,
			keywords,
			prebidEidsAllowed,
			relativePath,
			reloadOnBack,
			topscroll,
			topscrollWeekCount,
			userType
		} = page.data.displayAds;

		return {
			adPlacements,
			anonIds,
			articleId,
			device,
			segments,
			highImpactEnabled,
			pageContext,
			premium,
			keywords,
			prebidEidsAllowed,
			relativePath,
			reloadOnBack,
			topscroll,
			topscrollWeekCount,
			userType
		};
	}
}

export const adsInterface = new AdsInterface();
