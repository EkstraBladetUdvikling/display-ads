import { getAdschedule } from './adschedulehandler';
import { createRollUrl } from './createrollurl';
import { getPrebidTag } from './prebidtag';

import { getCustParamUrl, getKeysAndValues } from './queryParamUrl';
import type { TRollsHandler } from './types';

function createSchedule(
	scheduleObject: Partial<jwplayer.AdvertisingConfig>,
	keyValues: string,
	custParams: string
) {
	if (scheduleObject && JSON.stringify(scheduleObject) !== '{}') {
		if (scheduleObject.schedule && typeof scheduleObject.schedule !== 'string') {
			const scheduleTags = scheduleObject.schedule[0].tag;
			if (typeof scheduleTags === 'string') {
				scheduleObject.schedule = createRollUrl({
					custParams,
					keyValues,
					scheduleUrl: scheduleObject.schedule[0].tag as string
				});
			}
		} else {
			scheduleObject.schedule = createRollUrl({
				custParams,
				keyValues,
				scheduleUrl: scheduleObject.schedule as string
			});
		}
		return scheduleObject;
	} else {
		return null;
	}
}

export async function rollsHandler(
	rollsHandlerObject: TRollsHandler,
	jwPlayerInstance: jwplayer.JWPlayer,
	playerElementId: string
): Promise<Partial<jwplayer.AdvertisingConfig> | null> {
	try {
		const {
			// actAsPlay,
			adscheduleId,
			adschedulePath,
			articleId,
			articleTypeName,
			autoplayAllowed,
			cookieless,
			creativeTimeout,
			disableRolls,
			inline,
			// isCtp,
			// isDiscovery,
			// isSmartphone,
			playerParent,
			requestTimeout,
			sectionPath,
			type,
			videoType
		} = rollsHandlerObject;

		if (disableRolls) {
			return null;
		}

		const isPlayVideo = false; // articleTypeName === 'article_video_standalone' && actAsPlay;
		console.log('sectionName', isPlayVideo);

		const sectionName = sectionPath.split('/')[1];
		console.log('sectionName', sectionName);
		console.log('cookieless', cookieless);

		const adscheduleFromJW = await getAdschedule({ adscheduleId, adschedulePath });

		const defaultAdvertising = window.jwplayer.defaults.advertising ?? {};

		const scheduleObject = adscheduleFromJW
			? { ...defaultAdvertising, ...adscheduleFromJW, creativeTimeout, requestTimeout }
			: null;

		const custParams = await getCustParamUrl({
			articleId,
			articleTypeName,
			autoplayAllowed,
			inline,
			playerParent,
			sectionPath,
			type,
			videoType
		});

		const keyValues = await getKeysAndValues();

		let advertisingObject: Partial<jwplayer.AdvertisingConfig> = {
			client: 'googima',
			creativeTimeout,
			requestTimeout,
			skipoffset: 1,
			vpaidcontrols: true
		};

		const scheduleObjectAlter = createSchedule(scheduleObject, keyValues, custParams);
		if (scheduleObjectAlter) {
			advertisingObject = scheduleObjectAlter;
		}

		const advertisingOptions = advertisingObject;

		const urlFragments = {
			custParams,
			keyValues,
			url: String(adscheduleFromJW?.schedule)
		};

		if (!disableRolls) {
			if (advertisingObject && Object.keys(advertisingObject).length) {
				if (advertisingObject.schedule) {
					// Callback which performs header bidding.
					jwPlayerInstance.setPlaylistItemCallback(async (item) => {
						const tag = await getPrebidTag(
							advertisingObject.schedule as string,
							playerElementId,
							urlFragments
						);

						return Object.assign({}, item, {
							adschedule: [
								{
									offset: 'pre',
									tag
								}
							]
						});
					});
				}
			}
		}

		return advertisingOptions;
	} catch (error) {
		console.error({
			component: 'EBJW',
			label: 'rollsHandler',
			level: 'ERROR',
			message: (error as Error).message
		});
		return null;
	}
}
