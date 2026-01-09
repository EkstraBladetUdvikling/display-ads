import { env as publicEnv } from '$env/dynamic/public';

import { DEVICE } from '$lib/state';
import { PAGETYPES } from '$lib/types/admanager';
import { adPlacements } from './adplacements';

export const load = async () => {
	const anonId = crypto.randomUUID();
	const anonId_adform = crypto.randomUUID();

	return {
		device: DEVICE.smartphone,
		displayAds: {
			adPlacements,
			anonIds: {
				adform: anonId_adform,
				base: anonId,
				google: anonId
			},
			device: DEVICE.smartphone, // Reference the already extracted device value
			highImpactEnabled: true,
			keywords: { test: String(publicEnv.PUBLIC_ENVIRONMENT === 'test') },
			livewrappedKey: publicEnv.PUBLIC_LIVEWRAPPEDKEY,
			pageContext: PAGETYPES.FRONTPAGE,
			userType: 'anonymous'
		}
	};
};
