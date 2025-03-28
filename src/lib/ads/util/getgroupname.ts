export enum PLACEMENTGROUPNAMES {
	forside = 'eb_forside',
	krimi = 'eb_krimi',
	kup = 'eb_kup',
	noconsent = 'eb_noconsent',
	nyheder = 'eb_nyheder',
	penge = 'eb_penge',
	ros = 'eb_ros',
	sport = 'eb_sport',
	test = 'eb_test',
	underholdning = 'eb_underholdning'
}

export interface IGroupInfo {
	sectionName?: string;
	noConsent?: boolean;
}
