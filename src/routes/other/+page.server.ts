import { PAGETYPES } from '$lib/types/admanager';

export const load = async ({ parent }) => {
	const data = await parent();
	const { displayAds } = data;
	return {
		...data,
		displayAds: {
			...displayAds,
			pageContext: PAGETYPES.ARTICLE
		}
	};
};
