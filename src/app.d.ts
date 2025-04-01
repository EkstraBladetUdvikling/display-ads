interface IUnknowObject {
	[id: string]: IUnknowObject | string | number | boolean | Array<string | number | boolean>;
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

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	interface Window {
		ebCMP: IEBCMP;
		googletag: googletag;
		lwhb: {
			adsRendered: boolean;
			cmd: Array<() => void>;
			csKeyValues: (inputObj: IUnknowObject) => void;
			disablePrebid: boolean;
			loadAd: (ILoadAdData) => void;
			loaded: boolean;
			ortb2: (inputObj: IOrtb2Data) => void;
			prepareAd: (ILoadAdData) => void;
			refresh: (inputObj: string[], bool: boolean) => void;
			removeAdUnit: (tagId: string) => void;
			render: () => void;
			renderAd: () => void;
			resetPage: (bool: boolean) => void;
		};
		pbjs: {
			getConfig: () => { ortb2: IOrtb2Data };
		};
	}
}

export {};
