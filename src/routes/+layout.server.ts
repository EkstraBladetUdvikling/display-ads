import { DEVICE } from '$lib/state';
import { PAGETYPES } from '$lib/types/admanager';
import { adPlacements } from './adplacements';

export const load = async () => {
	const anonId = crypto.randomUUID();
	const anonId_adform = crypto.randomUUID();

	return {
		adPlacements,
		anonIds: {
			base: anonId,
			adform: anonId_adform
		},
		device: DEVICE.desktop,
		ebSegments: ['a', 'b'],
		highImpactEnabled: true,
		pageContext: PAGETYPES.FRONTPAGE,
		keywords: ['a', 'b']
	};
};
