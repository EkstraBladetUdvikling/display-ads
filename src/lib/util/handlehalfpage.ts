import { addPlacement } from './addplacement';
import { BANNERSTATE } from '../state';
import { type IBANNERSTATEBANNER } from '../types/admanager';

let timeout: ReturnType<typeof setTimeout>;
let handled = false;
function handleHalfPageScroll(hasWallpaper = false, caller: string, isFrontpage = false) {
  if (handled) return;

  if (hasWallpaper) {
    handled = true;

    const isOwnTemplate = caller === 'template';

    const fnContentArea = document.getElementById('fnContentArea');

    const { skinMaxScrollDepth } = window.adsm.pageSettings;

    const contentHeight = fnContentArea
      ? isOwnTemplate
        ? fnContentArea.clientHeight - 180
        : fnContentArea.clientHeight
      : 2200;

    const newSkinMaxScrollDepth = (window.adsm.pageSettings.skinMaxScrollDepth =
      contentHeight < skinMaxScrollDepth ? contentHeight : skinMaxScrollDepth);

    const pushdown = isFrontpage ? `${newSkinMaxScrollDepth + 50}px` : '0';

    document.body.style.setProperty('--wallpaper-pushdown', pushdown);

    return;
  }

  const { adUnits } = BANNERSTATE;

  const halfpageBanners = adUnits.reduce((acc: IBANNERSTATEBANNER[], adUnit: IBANNERSTATEBANNER) => {
    if (adUnit.cleanName === 'halfpage1' || adUnit.cleanName === 'halfpage2') {
      acc.push(adUnit);
    }
    return acc;
  }, []);

  halfpageBanners.forEach((adUnit: IBANNERSTATEBANNER) => {
    addPlacement(adUnit.cleanName as string, adUnit.targetId);
  });
}

export function handleHalfPage(hasWallpaper = false, caller: string = '', isFrontpage = false) {
  clearTimeout(timeout);

  if (hasWallpaper) {
    handleHalfPageScroll(hasWallpaper, caller, isFrontpage);
    return;
  }

  timeout = setTimeout(() => {
    handleHalfPageScroll(hasWallpaper, caller, isFrontpage);
  }, 500);
}
