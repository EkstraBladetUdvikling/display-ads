export interface ICreateRollUrl {
	custParams: string;
	keyValues: string;
	replaceOptions?: {
		[key: string]: string;
	};
	scheduleUrl: string;
}

export const createRollUrl = (rollUrlOptions: ICreateRollUrl) => {
	const { custParams, keyValues, replaceOptions, scheduleUrl } = rollUrlOptions;
	const decoded = decodeURIComponent(scheduleUrl);
	let removedCustParam =
		decoded.indexOf('&cust_params=') !== -1 ? decoded.split('&cust_params=')[0] : decoded;

	Object.keys(replaceOptions ?? {}).forEach((key) => {
		if (!key || !replaceOptions) return;
		removedCustParam = removedCustParam.replace(key, replaceOptions[key]);
	});

	return `${removedCustParam}${keyValues}&cust_params=${encodeURIComponent(custParams)}`;
};
