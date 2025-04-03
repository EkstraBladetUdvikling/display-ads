export function getUserType(segments: string[]): string {
  const returnValue =
    segments.indexOf('isCustomer') !== -1
      ? 'subscriber'
      : segments.indexOf('isUser') !== -1
      ? 'registered'
      : 'anonymous';

  return returnValue;
}
