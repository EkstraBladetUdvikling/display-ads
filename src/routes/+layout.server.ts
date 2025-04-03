import { DEVICE } from '$lib/state';
import { PAGETYPES } from '$lib/types/admanager';
import { adPlacements } from './adplacements';

export const load = async () => {
	const anonId = crypto.randomUUID();
	const anonId_adform = crypto.randomUUID();

	return {
		displayAds: {
			adPlacements,
			anonIds: {
				base: anonId,
				adform: anonId_adform
			},
			device: DEVICE.desktop,
			highImpactEnabled: true,
			keywords: ['a', 'b'],
			pageContext: PAGETYPES.FRONTPAGE,
			user: 'anonymous'
		}
	};
};
