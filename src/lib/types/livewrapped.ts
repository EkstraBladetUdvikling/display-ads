import type { IBANNERSTATEBANNER } from './admanager';

export interface ICbData {
	adUnit: string;
	backupAdJs: null;
	backupAdTag: null;
	bid: any;
	event: {
		auctionId: string;
		adType: 'banner' | 'native' | 'video' | string;
		banner: {
			content: string;
			height: number;
			trackers: { impression_urls: string[]; video_events: any };
			width: number;
		};
		buyerMemberId: number;
		cpm: number;
		cpm_publisher_currency: number;
		creativeId: number;
		dealId: undefined;
		height: number;
		mediaSubtypeId: number;
		mediaTypeId: number;
		publisher_currency_code: 'KR' | string;
		source: 'csm' | string;
		tagId: number;
		targetId: string;
		width: number;
	};
	height: number;
	width: number;
}

interface IParamsReturn {
	adUnit: string;
	params: {
		iu: string;
		output: 'vast';
	};
}

export interface ILoadAdData {
	adUnitName: string;
	allowedMediaTypes?: ('banner' | 'native' | 'video')[];
	callbackMethod?: (cbData: ICbData) => void;
	gamSizes?: IBANNERSTATEBANNER['gamSizes'];
	sizes?: number[][];
	video?: {
		// The video url created by pbjs.adServers.dfp.buildVideoUrl will be passed
		// to resolve below
		callback: () => void;
		// Optionally create the params that will be passed to pbjs.adServers.dfp.buildVideoUrl.
		// Parameters that Prebid needs are passed as parameters.
		// gamAdUnit is taken from the placement defined in the Livewrapped console.
		paramsFn: (prebidAdUnit: string, gamAdUnit: string) => IParamsReturn;
	};
	tagId: string;
}
