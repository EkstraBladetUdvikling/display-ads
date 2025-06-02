import { type IBANNERSTATEBANNER, PAGETYPES } from './types/admanager';

import { DEVICE } from './util/device';

export { DEVICE } from './util/device';

export interface IBannerState {
	adUnits: IBANNERSTATEBANNER[];
	adUnitsNoConsent: IBANNERSTATEBANNER[];
	completeCalled: boolean;
	context: PAGETYPES;
	device: DEVICE;
	placements: string[];
	premium: boolean;
	ready: boolean;
	reloadOnBack: boolean;
	renderCalled: boolean;
	waiting: (() => void)[];
	winHeight: number;
	winWidth: number;
}

export enum STATEKEY {
	adUnits = 'adUnits',
	adUnitsNoConsent = 'adUnitsNoConsent',
	completeCalled = 'completeCalled',
	context = 'context',
	device = 'device',
	placements = 'placements',
	premium = 'premium',
	ready = 'ready',
	reloadOnBack = 'reloadOnBack',
	renderCalled = 'renderCalled',
	waiting = 'waiting',
	winHeight = 'winHeight',
	winWidth = 'winWidth'
}

const STATE: IBannerState = {
	[STATEKEY.adUnits]: [],
	[STATEKEY.adUnitsNoConsent]: [],
	[STATEKEY.completeCalled]: false,
	[STATEKEY.context]: PAGETYPES.ARTICLE,
	[STATEKEY.device]: DEVICE.smartphone,

	[STATEKEY.placements]: [],
	[STATEKEY.premium]: false,
	[STATEKEY.ready]: false,
	[STATEKEY.reloadOnBack]: true,
	[STATEKEY.renderCalled]: false,
	[STATEKEY.waiting]: [],
	[STATEKEY.winHeight]: 0,
	[STATEKEY.winWidth]: 0
};

function init(updateKeys: Partial<IBannerState>): void {
	for (const key in updateKeys) {
		if (Object.prototype.hasOwnProperty.call(updateKeys, key as keyof IBannerState)) {
			const element = updateKeys[key as keyof IBannerState];
			if (Object.prototype.hasOwnProperty.call(STATE, key)) {
				STATE[key] = element;
			}
		}
	}
	STATE.winHeight = window.innerHeight;
	STATE.winWidth = window.innerWidth;
}

function setupDone(): void {
	STATE.ready = true;
	handleWaiting();
}

function handleWaiting(): void {
	STATE.waiting.forEach((cb) => {
		cb();
	});
}

function isReady(callback: () => void): void {
	if (STATE.ready) {
		return callback();
	} else {
		STATE.waiting.push(callback);
	}
}

function reset() {
	STATE.completeCalled = false;
	STATE.ready = false;
	STATE.placements = [];
	STATE.renderCalled = false;
	STATE.waiting = [];
}

export const BANNERSTATE = {
	get adUnits(): IBANNERSTATEBANNER[] {
		return STATE.adUnits;
	},
	get adUnitsNoConsent(): IBANNERSTATEBANNER[] {
		return STATE.adUnitsNoConsent;
	},
	get completeCalled(): boolean {
		return STATE.completeCalled;
	},
	set completeCalled(val: boolean) {
		STATE.completeCalled = val;
	},
	get context(): PAGETYPES {
		return STATE.context;
	},
	get device(): DEVICE {
		return STATE.device;
	},
	init,
	isReady,
	placements: STATE.placements,
	get premium(): boolean {
		return STATE.premium;
	},
	get ready(): boolean {
		return STATE.ready;
	},
	get reloadOnBack(): boolean {
		return STATE.reloadOnBack;
	},
	get renderCalled(): boolean {
		return STATE.renderCalled;
	},
	set renderCalled(val: boolean) {
		STATE.renderCalled = val;
	},
	reset,
	setupDone,
	get winHeight(): number {
		return STATE.winHeight;
	},
	get winWidth(): number {
		return STATE.winWidth;
	}
};
