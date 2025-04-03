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
		highImpactJs: IHighImpact;
		lwhb: ILiveWrapped;
		pbjs: IPrebidJS;
	}
}

export {};
