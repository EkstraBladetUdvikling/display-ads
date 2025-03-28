import { PLACEMENTGROUPNAMES } from './getgroupname';

import type { IBANNERSTATEBANNER } from '../types/admanager';

export const filterBannersByGroup = (banners: IBANNERSTATEBANNER[], isNoconsent: boolean, _premium: boolean) => {
  if (isNoconsent) {
    const filteredBanners = banners.filter((banner) => banner.siteName.toLowerCase() === PLACEMENTGROUPNAMES.noconsent);

    return filteredBanners;
  }

  const filteredBanners = banners.filter(
    (banner) =>
      banner.siteName.toLowerCase() !== PLACEMENTGROUPNAMES.noconsent &&
      banner.siteName.toLowerCase() !== PLACEMENTGROUPNAMES.test
  );

  return filteredBanners;
};
