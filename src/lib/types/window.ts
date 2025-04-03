import type { ILoadAdData } from './livewrapped';

interface IUnknowObject {
	[id: string]:
		| IUnknowObject
		| string
		| number
		| boolean
		| Array<string | number | boolean>
		| number[][];
}

interface IOrtb2Data {
	site: {
		ext: {
			data: {
				[id: string]: string[];
			};
		};
	};
}

export interface IADSM {
  pageSettings: {
    skinMaxScrollDepth: number
  };
}

export interface IHighImpact {
	cmd: Array<() => void>;
	defineSlot: (inputObj: IUnknowObject) => void;
	setConfig: (inputObj: IUnknowObject) => void;
	setTemplateConfig: (placementName: string, inputObj: IUnknowObject) => void;
}

export interface ILiveWrapped {
	adsRendered: boolean;
	cmd: Array<() => void>;
	csKeyValues: (inputObj: IUnknowObject) => void;
	disablePrebid: boolean;
	loadAd: (data: ILoadAdData) => void;
	loaded: boolean;
	ortb2: (inputObj: IOrtb2Data) => void;
	prepareAd: (data: ILoadAdData) => void;
	refresh: (inputObj: string[], bool: boolean) => void;
	removeAdUnit: (tagId: string) => void;
	render: () => void;
	renderAd: () => void;
	resetPage: (bool: boolean) => void;
}

export interface IPrebidJS {
	getConfig: () => { ortb2: IOrtb2Data };
}

export interface IDisplayAdsWindow {
  adsm: IADSM;
  highImpactJs: IHighImpact;
  lwhb: ILiveWrapped;
  pbjs: IPrebidJS;
}
