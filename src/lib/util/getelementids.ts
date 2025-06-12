export function getElementIds(
	placement: string,
	pageId: string | number
): { prefixId: string; targetId: string } {
	const prefixId = `wrapper_dut_${placement}_${pageId}`;
	const targetId = `dut_${placement}_${pageId}`;
	return { prefixId, targetId };
}
