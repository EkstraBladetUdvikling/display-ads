// const disallowedSection = '';

//   if (!consent && disallowedSection) return;

//   const firstScript = document.querySelector('script');

//     const lwScript = document.createElement('script');
//     lwScript.src = '//lwgadm.com/lw/pbjs?pid=${ livewrappedKey }';
//     if (firstScript && firstScript.parentNode) {
//       firstScript.parentNode.insertBefore(lwScript, firstScript);
//     }

//   const gptScript = document.createElement('script');
//   gptScript.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
//   if (firstScript && firstScript.parentNode) {
//     firstScript.parentNode.insertBefore(gptScript, firstScript);
//   }

//   const isReady = await window.eb.ready('ebBanners');

//   if (isReady) {
//     /** <%--
//      * Init banners
//      --%> */
//     const banners = adPlacements;

//     window.ebComponents.ebBanners.init({
//       articleId: '',
//       banners: adPlacements,
//       device: '',
//       ebSegments,
//       highImpactEnabled,
//       isFrontpage,
//       keywords,
//       noConsent: true,
//       prebidEidsAllowed: true,
//       premium: false,
//       relativePath: ,
//       reloadOnBack: true,
//       test: true,
//       topscroll: true,
//       topscrollWeekCount: '7',
//     });
//   }

import { page } from '$app/state';
import BannerHandler from './bannerhandler';
import { PUBLIC_livewrappedKey } from '$env/static/public';

export function adsInit(consent: string | boolean) {
	const disallowedSection = '';

	if (!consent && disallowedSection) return null;

	const firstScript = document.querySelector('script');
	const lwScript = document.createElement('script');
	lwScript.src = `//lwgadm.com/lw/pbjs?pid=${PUBLIC_livewrappedKey}`;
	if (firstScript && firstScript.parentNode) {
		firstScript.parentNode.insertBefore(lwScript, firstScript);
	}

	// const gptScript = document.createElement('script');
	// gptScript.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
	// if (firstScript && firstScript.parentNode) {
	// 	firstScript.parentNode.insertBefore(gptScript, firstScript);
	// }

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

	constructor(consent: string | boolean) {
		this.bannerHandler = adsInit(consent);
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
