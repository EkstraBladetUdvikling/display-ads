import { DEVICE } from './device';

function isIpadOs(): boolean {
	let isIPadOs =
		window.DeviceMotionEvent !== undefined &&
		window.DeviceOrientationEvent !== undefined &&
		navigator.maxTouchPoints === 5;
	if (!isIPadOs) {
		isIPadOs = navigator.userAgent.toLowerCase().indexOf('ipad') !== -1;
	}

	return isIPadOs;
}

export function getDeviceInfo(device: DEVICE) {
	const ipad = isIpadOs();

	if (ipad && device === DEVICE.desktop) {
		return { device: DEVICE.tablet, ipad: true };
	} else {
		return { device, ipad };
	}
}
