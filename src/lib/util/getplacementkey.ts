export const getPlacementKey = (placement: string, tagId: string): string =>
	`${placement}|${tagId}`;

export const dataFromPlacementKey = (
	placementKey: string
): { placement: string; tagId: string } => {
	const [placement, tagId] = placementKey.split('|');
	return { placement, tagId };
};
