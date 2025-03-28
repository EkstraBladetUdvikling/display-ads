import { BANNERSTATE } from '../state';
import type { ICbData, ICustomPlacement, IDefineTag, ILoadAdData } from '../types';

export function addCustomPlacement(customplacement: ICustomPlacement, byPassLW: boolean = false) {
  try {
    const { adUnitName, allowedMediaTypes, callbackMethod, invCode, gamSizes, sizes, tagId } = customplacement;

    if (!byPassLW && adUnitName && tagId) {
      window.lwhb.cmd.push(() => {
        const loadAdData: ILoadAdData = {
          adUnitName,
          callbackMethod,
          tagId,
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
    window.ebLog({
      component: 'admanager.addCustomPlacement',
      message: (error as Error).message,
    });
  }
}

export function addPlacement(placement: string, targetId?: string) {
  if (!BANNERSTATE.placements.includes(placement)) BANNERSTATE.placements.push(placement);

  BANNERSTATE.isReady(() => {
    const bannerData = BANNERSTATE.adUnits.find((adUnit) => adUnit.cleanName?.toLowerCase() === placement);
    if (bannerData) {
      const {
        allowedFormats: allowedMediaTypes,
        lwName: adUnitName,
        gamSizes,
        sizes,
        targetId: targetIdfromData,
      } = bannerData;
      const tagId = targetId ?? targetIdfromData ?? '';
      const adPlaceholder = document.getElementById(tagId);

      if (!adPlaceholder) throw new Error('adPlacement not found');

      while (adPlaceholder.firstChild) {
        adPlaceholder.firstChild.remove();
      }

      window.lwhb.cmd.push(() => {
        const loadAdData: ILoadAdData = {
          adUnitName,
          callbackMethod: (cbData: ICbData) => {
            try {
              if (cbData.event.adType === 'video' && placement === 'intext') {
                return;
              }

              if (BANNERSTATE.ebLive) {
                const banneriFrame = document.getElementById(tagId);
                const bannerContainer = banneriFrame?.parentElement;

                if (bannerContainer && bannerContainer.offsetWidth < cbData.width) {
                  const scaleValue = bannerContainer.offsetWidth / cbData.width;

                  banneriFrame.style.transform = `scale(${scaleValue})`;
                }
              }
            } catch (error) {
              window.ebLog({
                component: 'js-admanager',
                label: 'addPlacement.loadAdData',
                level: 'ERROR',
                message: (error as Error).message,
              });
            }
          },
          tagId,
        };

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
}
