import { page } from '$app/state';
import BannerHandler, { handleHalfPage } from './bannerhandler';
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

export class AdsInterface {
	private bannerHandler: BannerHandler | null = null;

	public init(consent: string | boolean, adnamiUnloadHandler?: () => void) {
		if (!page.data.displayAds) return;

		const disallowedSection = '';

		if (!consent && disallowedSection) return null;

		const extractedData = this.extractHandlerData();

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
	}

	public placementExists(placement: string) {
		if (!this.bannerHandler) return false;

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
			adNamiEnabled,
			adPlacements,
			anonIds,
			articleId,
			device,
			dynamicSeparately,
			segments,
			highImpactEnabled,
			livewrappedKey,
			pageContext,
			premium,
			keywords,
			prebidEidsAllowed,
			reloadOnBack,
			topscroll,
			topscrollWeekCount,
			userType
		} = page.data.displayAds;

		return {
			adNamiEnabled,
			adPlacements,
			anonIds,
			articleId,
			device,
			dynamicSeparately,
			segments,
			highImpactEnabled,
			livewrappedKey,
			pageContext,
			premium,
			keywords,
			prebidEidsAllowed,
			reloadOnBack,
			topscroll,
			topscrollWeekCount,
			userType
		};
	}
}

export const adsInterface = new AdsInterface();
