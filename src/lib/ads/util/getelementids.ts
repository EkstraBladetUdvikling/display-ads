export function getElementIds(placement: string): { prefixId: string; targetId: string } {
	const prefixId = `wrapper_dut_${placement}`;
	const targetId = `dut_${placement}`;
	return { prefixId, targetId };
}
