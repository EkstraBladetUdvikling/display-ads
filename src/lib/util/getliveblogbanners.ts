import { BANNERSTATE } from '../state';

export async function getLiveBlogBanners() {
  let ready = BANNERSTATE.ready;
  let testCount = 10;

  if (!ready) {
    // Get the current value of the property.
    const currentValue = BANNERSTATE.ready;

    // Wait for the property to change.
    await new Promise((resolve, reject) => {
      setInterval(() => {
        testCount--;
        ready = currentValue !== BANNERSTATE.ready;
        if (ready) {
          resolve(true);
        } else if (testCount === 0) {
          reject('Ads not ready in 2 seconds, aborting');
        }
      }, 200);
    });
  }

  return BANNERSTATE.liveBlogPlacements;
}
