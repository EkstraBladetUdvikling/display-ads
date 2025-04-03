import { PAGETYPES } from '$lib/types/admanager';

export const load = async ({ parent }) => {
	const data = await parent();

	return {
		...data,
		pageContext: PAGETYPES.SECTION
	};
};
