import { ALLOWEDFORMATS } from '../types/admanager';
import { BANNERSTATE, STATEKEY } from '../state';

import type { ICbData, ILoadAdData } from '../types/livewrapped';

import { onPersisted, sortPlacements } from '../util';

let handlingDynamic = false;
export function handleDynamicBanners(handlingDynamicArg = handlingDynamic): void {
  try {
    if (handlingDynamicArg) return;

    const dynamicPlacements = BANNERSTATE[STATEKEY.dynamicPlacements].sort(sortPlacements);

    handlingDynamic = true;
    const bodytextContainer = document.getElementById('fnBodytextTracking');

    if (!bodytextContainer) return;

    const dynamicBannerElements = Array.prototype.slice.call(
      bodytextContainer.querySelectorAll('div[id*="intext_outer"]')
    );
    const maxElements = 4;

    const banners = dynamicBannerElements.slice(0, maxElements);

    if (window.lwhb && window.lwhb.cmd) {
      window.lwhb.cmd.push(() => {
        banners.forEach((dynBanner: HTMLElement, idx: number) => {
          if (!dynamicPlacements[idx]) return;
          const { allowedFormats, gamSizes, lwName: adUnitName, name, sizes } = dynamicPlacements[idx];

          if (!adUnitName) return;

          const targetEl = dynBanner.querySelector('.eb-placement');
          const tagId = targetEl ? targetEl.id : dynBanner.id;

          const loadAdData: ILoadAdData = {
            adUnitName,
            callbackMethod: (cbData: ICbData) => {
              try {
                if (cbData && cbData.adUnit && cbData.event) {
                  document.getElementById(cbData.adUnit)?.parentElement?.classList.add('has-content');
                }
              } catch (error) {
                window.ebLog({
                  component: 'DynamicBanners',
                  label: 'loadAdData',
                  level: 'ERROR',
                  message: (error as Error).message,
                });
              }
            },
            tagId,
          };

          if (allowedFormats) {
            loadAdData.allowedMediaTypes = allowedFormats;
          }

          if (name.indexOf('dynamisk1') !== -1) {
            /**
             * @description remove first element(video) in sizes and formats if the article has video
             */
            if (window.ebJwPlayers) {
              const indexOfVideo = allowedFormats.indexOf(ALLOWEDFORMATS.VIDEO);
              const stringifiedOneOne = JSON.stringify([1, 1]);

              if (indexOfVideo !== -1) {
                allowedFormats.splice(indexOfVideo, 1);
                sizes.every((size, index) => {
                  if (JSON.stringify(size) === stringifiedOneOne) {
                    sizes.splice(index, 1);
                    return true;
                  }
                });
                loadAdData.sizes = sizes;

                if (gamSizes) {
                  gamSizes.every((size, index) => {
                    if (JSON.stringify(size) === stringifiedOneOne) {
                      gamSizes.splice(index, 1);
                      return true;
                    }
                  });
                  loadAdData.gamSizes = gamSizes;
                }
              }
            }
          }

          if (sizes) loadAdData.sizes = sizes;
          if (gamSizes) loadAdData.gamSizes = gamSizes;

          if (BANNERSTATE.renderCalled) {
            window.lwhb.loadAd(loadAdData);
          } else {
            window.lwhb.prepareAd(loadAdData);
          }
        });
      });
    }
  } catch (error) {
    window.ebLog({
      component: 'DynamicBanners',
      label: 'handleDynamicBanners',
      level: 'ERROR',
      message: (error as Error).message,
    });
  }
}

export const ebDynamicBanners = (): void => {
  BANNERSTATE.isReady(() => {
    handleDynamicBanners();
  });
  onPersisted(() => {
    handleDynamicBanners(false);
  });
};
