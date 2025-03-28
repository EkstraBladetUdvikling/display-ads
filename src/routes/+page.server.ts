import { DEVICE } from '$lib/ads/state';
import { PAGETYPES } from '$lib/ads/types/admanager';

const adPlacements = [
	{
		placementId: '22902736539',
		devices: ['DESKTOP', 'TABLET'],
		siteName: 'feltet_forside',
		name: 'feltet_forside_halfpage1',
		invCode: '83172459/feltet/feltet_forside/feltet_forside_halfpage1',
		allowedFormats: ['banner'],
		annoncemarkering: true,
		sizes: [
			[160, 600],
			[300, 250],
			[300, 600]
		],
		allowedOnPlus: false,
		pageTypes: ['FRONTPAGE'],
		isFluid: true
	},
	{
		placementId: '22902736710',
		devices: ['DESKTOP', 'TABLET'],
		siteName: 'feltet_forside',
		name: 'feltet_forside_halfpage3',
		invCode: '83172459/feltet/feltet_forside/feltet_forside_halfpage3',
		allowedFormats: ['banner'],
		annoncemarkering: true,
		sizes: [
			[160, 600],
			[300, 250],
			[300, 600]
		],
		allowedOnPlus: false,
		pageTypes: ['FRONTPAGE'],
		isFluid: true
	},
	{
		placementId: '22902736965',
		devices: ['DESKTOP', 'TABLET'],
		siteName: 'feltet_forside',
		name: 'feltet_forside_monster1',
		invCode: '83172459/feltet/feltet_forside/feltet_forside_monster1',
		allowedFormats: ['banner', 'native'],
		annoncemarkering: true,
		sizes: [
			[15, 15],
			[728, 90],
			[930, 180],
			[930, 600],
			[970, 560],
			[970, 570]
		],
		allowedOnPlus: false,
		pageTypes: ['FRONTPAGE'],
		isFluid: true
	},
	{
		placementId: '22902737223',
		devices: ['DESKTOP', 'TABLET'],
		siteName: 'feltet_forside',
		name: 'feltet_forside_monster3',
		invCode: '83172459/feltet/feltet_forside/feltet_forside_monster3',
		allowedFormats: ['banner', 'native'],
		annoncemarkering: true,
		sizes: [
			[15, 15],
			[728, 90],
			[930, 180],
			[930, 600],
			[970, 560],
			[970, 570]
		],
		allowedOnPlus: false,
		pageTypes: ['FRONTPAGE'],
		isFluid: true
	}
];

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
