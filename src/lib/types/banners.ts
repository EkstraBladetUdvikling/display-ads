import { DEVICE } from '../state';
import type { ebDynamicBanners } from '../dynamicbanners/DynamicBanners';
import type { IAdmanagerBanners, PAGETYPES } from './admanager';

import type { ILoadAdData } from './livewrapped';

import type { getElementIds, getKeyValues, getLiveBlogBanners } from '../util';

import type { updateORTBData } from '../util/updateortbdata';

export interface IKeywords {
	[id: string]: string | string[];
}

export interface IBannerInit {
	adNamiEnabled?: boolean;
	anonIds?: {
		base: string;
		adform: string;
	};
	articleId?: string;
	adPlacements: IAdmanagerBanners[];
	device: DEVICE;
	highImpactEnabled?: boolean;
	keywords?: IKeywords;
	lwReplaceValues?: string[];
	pageContext: PAGETYPES;
	prebidEidsAllowed?: boolean;
	premium?: boolean;
	reloadOnBack?: boolean;
	segments?: string[];
	test?: boolean;
	topscroll?: boolean;
	topscrollWeekCount?: number;
	userType?: string;
}

export interface ICustomPlacement extends Partial<ILoadAdData> {
	addPrefix?: boolean;
	invCode?: string;
	prefixId?: string;
}

export interface ISiteBanners {
	addCustomPlacement: (customOptions: ICustomPlacement, skipLW: boolean) => void;
	addPlacement: (placementName: string, targetId?: string) => void;
	ebDynamicBanners: typeof ebDynamicBanners;
	getElementIds: typeof getElementIds;
	getKeyValues: typeof getKeyValues;
	getLiveBlogBanners: Awaited<typeof getLiveBlogBanners>;
	updateORTBData: typeof updateORTBData;
}
