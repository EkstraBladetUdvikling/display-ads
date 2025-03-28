export { ebDynamicBanners } from './dynamicbanners/DynamicBanners';
export {
	addCustomPlacement,
	addPlacement,
	getElementIds,
	getKeyValues,
	getLiveBlogBanners,
	getUserType,
	handleHalfPage,
	PLACEMENTGROUPNAMES,
	updateORTBData
} from './util';

import { handleTopScroll } from './topscroll/TopScroll';
import { addHighImpact, highimpactInit } from './highimpact';
import {
	addPlacement,
	filterBannersByGroup,
	getElementIds,
	getKeyValues,
	getSizeValues,
	getUserType,
	onPersisted,
	PLACEMENTGROUPNAMES,
	updateORTBData
} from './util';

import { BANNERSTATE, DEVICE } from './state';

import { type IBANNERSTATEBANNER } from './types/admanager';

import type { IBannerInit, IDefineTag } from './types';
import { getDeviceInfo } from './util/isipados';

class BannerHandler {
	private livewrappedTimeout = 2500;
	private renderedBanners: string[] = [];

	constructor(initOptions: IBannerInit) {
		this.init(initOptions);

		onPersisted(() => {
			this.replaceAds();
		});

		if (document.readyState === 'complete' || document.readyState === 'interactive') {
			this.complete();
		} else {
			document.addEventListener('readystatechange', () => {
				if (document.readyState === 'interactive' || document.readyState === 'complete') {
					this.complete();
				}
			});
		}
	}

	public replaceAds() {
		if (window.lwhb) {
			// refresh all banneres that was renderen before
			window.lwhb.refresh(this.renderedBanners, false);
			// reset renderedBanners
			this.renderedBanners = [];
		}
	}

	public replayAds() {
		BANNERSTATE.placements.forEach((placementName) => addPlacement(placementName));
	}

	private complete() {
		if (!BANNERSTATE.completeCalled) {
			BANNERSTATE.completeCalled = true;
			BANNERSTATE.isReady(() => {
				if (window.lwhb) {
					window.lwhb.cmd.push(() => {
						// This does not actaully render the ads, it tells lwhb that we have all
						// expected ads in the queue, lwhb handles lazyloading
						window.lwhb.render();
						BANNERSTATE.renderCalled = true;
					});
				}

				setTimeout(() => {
					if (window.lwhb && window.lwhb.loaded && window.lwhb.adsRendered) return;

					window.lwhb.disablePrebid = true;
					this.fallbackQueue();
				}, this.livewrappedTimeout);
			});
		}
	}

	private fallbackQueue() {
		window.googletag.cmd.push(() => {
			BANNERSTATE.placements.forEach((placement) => {
				const bannerData = BANNERSTATE.adUnits.find((adUnit) => adUnit.cleanName === placement);

				if (!bannerData) return;

				const { gamSizes, invCode, targetId } = bannerData;

				window.googletag
					.defineSlot(invCode, gamSizes, targetId)
					.addService(window.googletag.pubads());
			});

			window.googletag.enableServices();
			window.googletag.pubads().refresh();
		});
	}

	private init(initOptions: IBannerInit) {
		const {
			anonIds,
			articleId,
			adPlacements,
			device: userAgentDevice,
			ebSegments,
			highImpactEnabled,
			pageContext,
			keywords: escKeywords,
			prebidEidsAllowed,
			premium,
			relativePath,
			reloadOnBack,
			topscroll: topscrollAllowed,
			topscrollWeekCount
		} = initOptions;

		/**
		 * Google Publisher Tag setup
		 */
		// create empty googletag object if it doesn't exist
		window.googletag = window.googletag || { cmd: [] };
		// pubads setup
		window.googletag.cmd.push(() => {
			window.googletag.pubads().setPublisherProvidedId(anonIds.base);
			window.googletag.pubads().setTargeting('test', true);
			window.googletag.pubads().enableSingleRequest();
			window.googletag.pubads().collapseEmptyDivs();
			window.googletag.pubads().disableInitialLoad();
			if (adPlacements) {
				window.googletag.pubads().addEventListener('slotRenderEnded', (event: any) => {
					const slotElementId = event.slot.getSlotElementId();
					const adUnitPath = event.slot.getAdUnitPath();
					const bannerWrapper = document.getElementById(slotElementId.replace('_', '_wrapper_'));
					const bannerData = adPlacements.find((banner) => `/${banner.invCode}` === adUnitPath);
					if (event.isEmpty && bannerWrapper) {
						bannerWrapper.classList.add('hidden');
					} else {
						// Came from addCustomPlacement and wont be found in bannerData
						if (!bannerData) return;

						// add the banner to list of rendered banners unless its a topbanner
						if (
							bannerData.name.indexOf('topbanner') === -1 &&
							bannerData.name.indexOf('megaboard_top') === -1
						) {
							this.renderedBanners.push(slotElementId);
						}
						// add the has-content class to show our ad marking
						if (bannerData.annoncemarkering && bannerWrapper) {
							bannerWrapper.classList.add('has-content');
						}
					}
				});
			}
		});

		// refresh Correlator on persisted
		window.addEventListener('pageshow', (event) => {
			if (event.persisted && reloadOnBack) {
				window.googletag.cmd.push(() => {
					window.googletag.pubads().updateCorrelator();
				});
			}
		});

		/**
		 * LiveWrapped setup
		 */
		window.lwhb = window.lwhb || { cmd: [] };

		const device =
			userAgentDevice === DEVICE.desktop ? getDeviceInfo(userAgentDevice).device : userAgentDevice;

		const userType = getUserType(ebSegments);

		const defaultKeywords = {
			article: articleId,
			screen: getSizeValues(device),
			userType
		};

		const pp_audiences = escKeywords.Relevance_Audiences;

		const split = String(Math.floor(Math.random() * 20) + 1);

		const keywords = { ...defaultKeywords, ...escKeywords, pp_audiences, split };
		const keyValues = getKeyValues(relativePath, articleId);
		keywords.ekstra_bladet = [...keywords.ekstra_bladet, ...keyValues];

		if (premium) {
			keywords.ekstra_bladet.push('plus');
		}

		window.lwhb.cmd.push(() => {
			/**
			 * Adding userid to livewrapped
			 */
			const eids = prebidEidsAllowed ? anonIds.adform : undefined;
			if (eids) window.lwhb.csKeyValues({ eb_anon_uuid_adform: eids });

			/**
			 * Adding keywords to GPT
			 */
			window.googletag.cmd.push(() => {
				for (const [key, value] of Object.entries(keywords)) {
					window.googletag.pubads().setTargeting(key, value);
				}
			});
		});

		updateORTBData(keywords);

		if (highImpactEnabled) highimpactInit();

		if (!adPlacements) return;

		const noConsentGroup = window.ebCMP.noConsentGroup();
		const groupName = noConsentGroup ? PLACEMENTGROUPNAMES.noconsent : undefined;

		/**
		 * Handle actual banners
		 */
		const banners = filterBannersByGroup(adPlacements as IBANNERSTATEBANNER[], noConsentGroup);
		const adUnits: IBANNERSTATEBANNER[] = [];
		const dynamicPlacements: IBANNERSTATEBANNER[] = [];
		const liveBlogPlacements: IBANNERSTATEBANNER[] = [];
		banners.forEach((banner) => {
			try {
				const { allowedFormats, allowedOnPlus, invCode, name, pageTypes, siteName, sizes } = banner;
				banner.cleanName = name.replace(`${siteName}_`, '');

				/**
				 * insufficient info
				 */
				if (!sizes || !pageTypes) return;

				/**
				 * not allowed in pageContext
				 */
				if (pageTypes.indexOf(pageContext) === -1) return;

				/**
				 * not allowed in plus pageContext
				 */
				if (premium && !allowedOnPlus) return;

				const { prefixId, targetId } = getElementIds(banner.cleanName);

				const defineTag: IDefineTag = {
					allowedFormats,
					invCode,
					resizeAdParentDiv: true,
					sizes,
					targetId
				};

				if (banner.cleanName.indexOf('halfpage') !== -1) {
					const keptSizes: number[][] = [];
					const winWidth = window.innerWidth;
					sizes.forEach((size: number[]) => {
						if (size[0] <= 300 && winWidth >= 940 + 600) {
							keptSizes.push(size);
						} else if (size[0] <= 160 && winWidth >= 940 + 300) {
							keptSizes.push(size);
						}
					});

					defineTag.sizes = keptSizes.length ? keptSizes : sizes;
				}
				if (!defineTag.sizes) return;

				// Livewrapped needs us to send gamSizes for GPT
				const gamSizes: IBANNERSTATEBANNER['gamSizes'] = defineTag.sizes.slice();

				if (allowedFormats) {
					defineTag.allowedFormats = allowedFormats;
				}

				if (banner.isFluid) {
					gamSizes.push(['fluid']);
				}

				/**
				 * Handle special cases
				 */
				if (banner.cleanName.indexOf('dynamisk') !== -1) {
					dynamicPlacements.push({ ...banner, gamSizes, prefixId, targetId });
					return;
				} else if (banner.cleanName.indexOf('scribble') !== -1) {
					liveBlogPlacements.push({ ...banner, gamSizes, prefixId, targetId });
				}

				if (banner.cleanName.indexOf('topscroll') !== -1) {
					if (topscrollAllowed) handleTopScroll(topscrollWeekCount, banner.lwName, defineTag);
				} else {
					adUnits.push({ ...banner, gamSizes, prefixId, sizes: defineTag.sizes, targetId });
				}

				if (highImpactEnabled) addHighImpact(banner, targetId);

				/**
				 * Fixed sizes on monster banners
				 */
				if (banner.cleanName.indexOf('monster') !== -1) {
					const maxHeight = banner.sizes.reduce((max, size) => {
						const height = size[1];
						return height > max ? height : max;
					}, 0);

					const adPlaceholder = document.getElementById(targetId);
					if (adPlaceholder) {
						adPlaceholder.style.height = `${maxHeight}px`;
					}
				}
			} catch (error) {
				console.error({
					component: 'js-admanager',
					label: 'BannerHandler.forEach',
					level: 'ERROR',
					message: (error as Error).message
				});
			}
		});

		BANNERSTATE.init({
			adUnits,
			pageContext,
			device,
			dynamicPlacements,
			ebLive: !!initOptions.relativePath.match(/eblive/),
			groupName,
			liveBlogPlacements,
			premium,
			reloadOnBack
		});

		BANNERSTATE.setupDone();
	}
}

export const init = (initOptions: IBannerInit): BannerHandler => new BannerHandler(initOptions);
