import { PAGETYPES } from '$lib/ads/types/admanager';

export const load = async ({ parent }) => {
	const data = await parent();

	return {
		...data,
		pageContext: PAGETYPES.ARTICLE
	};
};
