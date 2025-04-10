export interface IAdvertisingUrlFragments {
	custParams: string;
	keyValues: string;
	url: string;
}

export type TAdScheduleOptions = Pick<TRollsHandler, 'adscheduleId' | 'adschedulePath'>;

export type TRollsHandler = {
	adscheduleId: string;
	adschedulePath: string;
	autoplayAllowed: boolean;
	cookieless: string;
	creativeTimeout: number;
	custParams: string;
	disableRolls: boolean;
	isCtp: boolean;
	playerElementId: string;
	requestTimeout: number;
	sectionPath: string;
};

export interface IUrlFragments {
	custParams: string;
	keyValues: string;
	url: string;
}
