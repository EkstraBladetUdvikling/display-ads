import { page } from '$app/state';
import BannerHandler from './bannerhandler';
import { PUBLIC_livewrappedKey } from '$env/static/public';

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

function adsInit(consent: string | boolean, adnamiUnloadHandler?: () => void) {
	const disallowedSection = '';

	if (!consent && disallowedSection) return null;

	window.lwhb = window.lwhb || { cmd: [], disableAdServerScriptLoad: true };

	const firstScript = document.querySelector('script');
	const lwScript = document.createElement('script');
	lwScript.src = `//lwgadm.com/lw/pbjs?pid=${PUBLIC_livewrappedKey}`;
	if (firstScript && firstScript.parentNode) {
		firstScript.parentNode.insertBefore(lwScript, firstScript);
	}

	const gptScript = document.createElement('script');
	gptScript.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
	if (firstScript && firstScript.parentNode) {
		firstScript.parentNode.insertBefore(gptScript, firstScript);
	}

	handleAdnami(adnamiUnloadHandler);

	const {
		adPlacements,
		anonIds,
		articleId,
		device,
		ebSegments,
		highImpactEnabled,
		pageContext,
		premium,
		keywords
	} = page.data;

	return new BannerHandler({
		adPlacements,
		anonIds,
		articleId,
		device,
		ebSegments,
		highImpactEnabled,
		pageContext,
		keywords,
		prebidEidsAllowed: true,
		premium,
		relativePath: page.url.pathname,
		reloadOnBack: true,
		topscroll: true,
		topscrollWeekCount: 7
	});
}

export class AdsInterface {
	private bannerHandler: BannerHandler | null = null;

	constructor(consent: string | boolean, adnamiUnloadHandler?: () => void) {
		this.bannerHandler = adsInit(consent, adnamiUnloadHandler);
	}

	public updateContext() {
		const {
			adPlacements,
			anonIds,
			articleId,
			device,
			ebSegments,
			highImpactEnabled,
			pageContext,
			premium,
			keywords
		} = page.data;

		this.bannerHandler?.updateContext({
			adPlacements,
			anonIds,
			articleId,
			device,
			ebSegments,
			highImpactEnabled,
			pageContext,
			premium,
			keywords
		});
	}
}
