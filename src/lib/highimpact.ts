import { BANNERSTATE, DEVICE } from './state';
import type { IBANNERSTATEBANNER } from './types/admanager';

/* setup high impact */
export function highimpactInit() {
	window.highImpactJs = window.highImpactJs || { cmd: [] };

	// TODO: move this to a separate file
	window.highImpactJs.cmd.push(() => {
		if (window.highImpactJs.setConfig) {
			window.highImpactJs.setConfig({
				plugins: ['gam'],
				topBarHeight: 75,
				zIndex: 1000001
			});
		}

		const peekAmount = BANNERSTATE.device === DEVICE.desktop ? '600px' : '60vh';
		if (window.highImpactJs.setTemplateConfig) {
			window.highImpactJs.setTemplateConfig('midscroll', {
				peekAmount
			});
		}

		if (window.highImpactJs.setTemplateConfig) {
			window.highImpactJs.setTemplateConfig('topscroll', {
				arrowUrl:
					'data:image/png;base64,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',
				title: 'Scroll down for more'
			});
		}

		if (window.highImpactJs.setTemplateConfig) {
			window.highImpactJs.setTemplateConfig('skins', {
				contentWrapperSelector: '#ebSectionWrapper', // The selector for the content area
				scrollTo: {
					height: 3600 // The height in px for how long the outsider ads should be sticky alternatively you can use a selector instead.
				},
				// The height in px for how long the outsider ads should be sticky
				topAdHeight: 170
			});
		}
	});

	// window.addEventListener('message', (event) => {
	// 	if (typeof event.data === 'string' && event.data.indexOf('high-impact-js') !== -1) {
	// 		if (event.data.indexOf('AD_RENDERED') !== -1 && event.data.indexOf('origins') !== -1) {
	// 			const data = JSON.parse(event.data);
	// 		}
	// 	}
	// });
}

export function addHighImpact(banner: IBANNERSTATEBANNER, adUnitId: string) {
	const slot = banner.invCode;

	const sizeMatchTopscrollDesktop = banner.sizes.find((size) => size[0] === 1 && size[1] === 2);
	const sizeMatchTopscrollSmartphone = banner.sizes.find(
		(size) => size[0] === 300 && size[1] === 220
	);

	if (sizeMatchTopscrollDesktop || sizeMatchTopscrollSmartphone) {
		window.highImpactJs.cmd.push(() => {
			const sizes = BANNERSTATE.device === 'desktop' ? [[1, 2]] : [[300, 220]];

			if (window.highImpactJs.defineSlot) {
				window.highImpactJs.defineSlot({
					adUnitId,
					sizes,
					slot,
					template: 'topscroll',
					waitForAdSignal: true
				});
			}
		});
		// SKINS - disabled for now
		// } else if (banner.cleanName?.indexOf('megaboard_top') !== -1) {
		// 	window.highImpactJs.cmd.push(() => {
		// 		if (window.highImpactJs.defineSlot) {
		// 			window.highImpactJs.defineSlot({
		// 				adUnitId,
		// 				sizes: [[970, 170]],
		// 				slot,
		// 				template: 'skins',
		// 				waitForAdSignal: true
		// 			});
		// 		}
		// 	});
	} else {
		const sizeMatchMidscrollDesktop = banner.sizes.find(
			(size) => size[0] === 970 && size[1] === 570
		);
		const sizeMatchMidscrollSmartphone = banner.sizes.find(
			(size) => size[0] === 300 && size[1] === 240
		);

		if (sizeMatchMidscrollDesktop || sizeMatchMidscrollSmartphone) {
			window.highImpactJs.cmd.push(() => {
				const sizes = BANNERSTATE.device === 'desktop' ? [[970, 570]] : [[300, 240]];
				if (window.highImpactJs.defineSlot) {
					window.highImpactJs.defineSlot({
						adUnitId,
						sizes,
						slot,
						template: 'midscroll',
						waitForAdSignal: true
					});
				}
			});
		}

		// if (
		// 	banner.cleanName?.indexOf('swedishtakeover') !== -1 ||
		// 	banner.cleanName?.indexOf('swedish_artikel') !== -1
		// ) {
		// 	window.highImpactJs.cmd.push(() => {
		// 		const sizes = BANNERSTATE.device === 'desktop' ? [[970, 570]] : [[300, 240]];
		// 		if (window.highImpactJs.defineSlot) {
		// 			window.highImpactJs.defineSlot({
		// 				adUnitId,
		// 				sizes,
		// 				slot,
		// 				template: 'midscroll',
		// 				waitForAdSignal: true
		// 			});
		// 		}
		// 	});
		// }
	}
}
