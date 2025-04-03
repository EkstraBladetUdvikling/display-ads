import type { DEVICE } from '../state';
import type { TBannerSizes } from './placementinfo';

export enum ALLOWEDFORMATS {
	BANNER = 'banner',
	NATIVE = 'native',
	VIDEO = 'video'
}

export enum PAGETYPES {
	ARTICLE = 'ARTICLE',
	FRONTPAGE = 'FRONTPAGE',
	SECTION = 'SECTION'
}

export interface IAdmanagerBanners {
	active: boolean;
	allowedFormats: ALLOWEDFORMATS[];
	allowedOnPlus: boolean;
	annoncemarkering: boolean;
	devices: DEVICE[];
	invCode: string;
	isFluid: boolean;
	name: string;
	pageTypes: PAGETYPES[];
	placementId: number;
	siteName: string;
	sizes: TBannerSizes;
}

export interface IDefineTag {
	allowedFormats?: ALLOWEDFORMATS[];
	externalImpId?: string;
	invCode: string;
	native?: {
		renderer_id: number;
	};
	resizeAdParentDiv: true;
	sizes?: TBannerSizes;
	targetId: string;
}

export interface IBANNERSTATEBANNER extends IAdmanagerBanners {
	cleanName?: string;
	gamSizes?: (number[] | 'fluid'[])[]; // googletag.GeneralSize;
	lwName: string;
	prefixId?: string;
	targetId?: IDefineTag['targetId'];
}
