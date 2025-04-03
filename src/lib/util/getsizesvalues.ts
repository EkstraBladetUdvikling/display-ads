import { DEVICE } from '../state';
import { getDeviceInfo } from './isipados';

enum SIZES {
	SMALL = 'small',
	MEDIUM = 'medium',
	LARGE = 'large',
	XLARGE = 'xlarge'
}

function getRotation() {
	if (screen.orientation) {
		return String(screen.orientation.type).split('-')[0];
	} else {
		return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
	}
}

export const getSizeValues = (deviceArg: string): string => {
	const { device, ipad } = getDeviceInfo(deviceArg.toLowerCase() as DEVICE);

	let availableBanner = '';
	if (device === DEVICE.desktop && !ipad) {
		const viewportWidth = window.innerWidth;

		if (viewportWidth < 1025) {
			availableBanner = SIZES.SMALL;
		} else if (viewportWidth > 1025 && viewportWidth < 1025 + 320) {
			availableBanner = SIZES.MEDIUM;
		} else if (viewportWidth > 1025 + 320 && viewportWidth < 1025 + 620) {
			availableBanner = SIZES.LARGE;
		} else {
			availableBanner = SIZES.XLARGE;
		}
	} else if (device === DEVICE.tablet || ipad) {
		const screenWidth = getRotation() === 'portrait' ? screen.width : screen.height;
		if (screenWidth < 1025) {
			availableBanner = SIZES.SMALL;
		} else if (screenWidth > 1025 && screenWidth < 1025 + 320) {
			availableBanner = SIZES.MEDIUM;
		} else if (screenWidth > 1025 + 320 && screenWidth < 1025 + 620) {
			availableBanner = SIZES.LARGE;
		} else {
			availableBanner = SIZES.XLARGE;
		}
	}
	return availableBanner;
};
