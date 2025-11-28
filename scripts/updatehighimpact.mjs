import * as fs from 'fs';

(async () => {
	try {
		const cb = Date.now();

		const hiUrl = `https://video.seenthis.se/public/patrik/ekstrabladet/high-impact.min.js?cb=${cb}`;

		const contentFetch = await fetch(hiUrl).then((res) => res.text());

		fs.writeFileSync('static/highimpact/highimpact.min.js', contentFetch, 'utf8');
		console.log('Updated high-impact.min.js successfully.');
	} catch (error) {
		console.error('Error updating high-impact.min.js:', error);
		process.exit(1);
	}
})();
