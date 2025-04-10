import type { IDisplayAdsWindow } from '$lib/types/window';

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
	interface Window extends IDisplayAdsWindow {
		ebCMP: IEBCMP;
		googletag: googletag;
		jwplayer: jwplayer;
	}
}
