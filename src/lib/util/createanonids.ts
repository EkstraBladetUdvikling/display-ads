import { createHash } from 'crypto';

export const createAnonId = (feltetId: string, receiver: string) => {
	const x = `${receiver.toLowerCase()}${feltetId.toLowerCase()}`;
	const bytes = new Int8Array(new TextEncoder().encode(x));

	// Convert Int8Array to Buffer
	const buffer = Buffer.from(bytes);
	const hash = createHash('md5').update(buffer).digest('hex');

	return hash;
};
