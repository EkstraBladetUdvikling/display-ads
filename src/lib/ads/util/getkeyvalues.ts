export function getKeyValues(path: string, context: string = 'article'): string[] {
	try {
		if (typeof path.split('/')[1] === 'undefined') {
			return ['forside'];
		}
		const splitPath = path.split('/');
		const values = splitPath.slice(1);

		values.push(context);

		return values;
	} catch (error) {
		console.error({
			component: 'js-admanager',
			label: 'getKeyValues',
			level: 'ERROR',
			message: (error as Error).message
		});

		return [];
	}
}
