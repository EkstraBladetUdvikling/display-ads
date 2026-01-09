import { env as publicEnv } from '$env/dynamic/public';

export const logger = (...arg: unknown[]) => {
	const displayadsDebug =
		window.location.search.includes('displayads_debug') ||
		publicEnv.PUBLIC_DEBUG_DISPLAYADS === 'true';
	// || window.location.href.indexOf('localhost') !== -1;
	if (displayadsDebug) {
		console.log('DISPLAY ADS', ...arg);
	}
};
