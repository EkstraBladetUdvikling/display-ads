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

export interface ILoadAdData {
	adUnitName: string;
	allowedMediaTypes?: ('banner' | 'native' | 'video')[];
	callbackMethod?: (cbData: ICbData) => void;
	gamSizes?: IBANNERSTATEBANNER['gamSizes'];
	sizes?: number[][];
	tagId: string;
}
