import { DEVICE } from '../state';
import type { ebDynamicBanners } from '../dynamicbanners/DynamicBanners';
import type { IAdmanagerBanners, PAGETYPES } from './admanager';

import type { ILoadAdData } from './livewrapped';

import type { getElementIds, getKeyValues, getLiveBlogBanners, getUserType } from '../util';

import type { updateORTBData } from '../util/updateortbdata';

export interface IKeywords {
	[id: string]: string | string[];
	ekstra_bladet: string[];
	ekstra_bladet_tags: string[];
	pt1: string;
	pt2: string;
	Relevance_Audiences: string[];
	Relevance_Context: string[];
}

export interface IBannerInit {
	anonIds: {
		base: string;
		adform: string;
	};
	articleId: string;
	adPlacements: IAdmanagerBanners[];
	device: DEVICE;
	ebSegments: string[];
	highImpactEnabled: boolean;
	keywords: IKeywords;
	lwReplaceValues?: string[];
	pageContext: PAGETYPES;
	prebidEidsAllowed: boolean;
	premium: boolean;
	relativePath: string;
	reloadOnBack: boolean;
	test?: boolean;
	topscroll: boolean;
	topscrollWeekCount: number;
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
	getUserType: typeof getUserType;
	updateORTBData: typeof updateORTBData;
}
