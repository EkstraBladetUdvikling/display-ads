import { env as publicEnv } from '$env/dynamic/public';

export const logger = (...arg: unknown[]) => {
	const displayadsDebug =
		sessionStorage.getItem('DISPLAYADS_DEBUG') === 'true' ||
		publicEnv.PUBLIC_DISPLAYADS_DEBUG === 'true';
	if (displayadsDebug) {
		console.log('DISPLAY ADS', ...arg);
	}
};
