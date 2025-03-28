export function getElementIds(placement: string): { prefixId: string; targetId: string } {
  const prefixId = `ebbanner_wrapper_${placement}`;
  const targetId = `ebbanner_${placement}`;
  return { prefixId, targetId };
}
