import type { IInitJWOptions, IRollOptions } from '../types';

export interface IAdvertisingUrlFragments {
	custParams: string;
	keyValues: string;
	url: string;
}

export type TAdScheduleOptions = Pick<IRollOptions, 'adscheduleId' | 'adschedulePath'>;

export type TRollsHandler = IRollOptions &
	Pick<
		IInitJWOptions,
		'articleId' | 'cookieless' | 'inline' | 'isDiscovery' | 'isSmartphone' | 'playerParent'
	> & {
		autoplayAllowed: boolean;
		isCtp: boolean;
	};

export type TCustomParamInfo = Pick<IInitJWOptions, 'articleId' | 'inline' | 'playerParent'> &
	Pick<IRollOptions, 'articleTypeName' | 'sectionPath' | 'type' | 'videoType'> & {
		autoplayAllowed: boolean;
		userType?: string;
	};
