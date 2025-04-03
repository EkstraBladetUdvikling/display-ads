import { BANNERSTATE } from '../state';
import type { IDefineTag } from '../types';

function getCurrentPeriodEndTime(): number {
	const endDate = new Date();
	endDate.setHours(23);
	endDate.setMinutes(59);
	endDate.setSeconds(59);
	endDate.setMilliseconds(0);
	const endDateDay = endDate.getDay();

	let nextShowStarts;
	if (endDateDay !== 0) {
		const endDateTime = endDate.getTime();
		const added = endDateTime + 1000 * 60 * 60 * 24 * (7 - endDateDay);
		nextShowStarts = new Date(added);
	} else {
		nextShowStarts = endDate;
	}
	return nextShowStarts.getTime();
}

function getTopscrollAllowed(allowedCount: number = 2): boolean {
	if (BANNERSTATE.premium) return false;

	const status = localStorage ? localStorage.getItem('topscrollStatus') : null;

	if (status === null) {
		return true;
	} else {
		const today = new Date();
		today.setHours(0);
		today.setMinutes(0);
		today.setSeconds(1);
		today.setMilliseconds(0);
		const todayTime = today.getTime();

		const statusBreakUp = status.split('|');

		const count = statusBreakUp.length;
		const period = statusBreakUp.shift() as string;

		if (todayTime < parseFloat(period) && count > allowedCount) {
			return false;
		}
		for (let i = 0; i < statusBreakUp.length; i++) {
			if (todayTime > parseFloat(statusBreakUp[i])) {
				return true;
			} else if (todayTime === parseFloat(statusBreakUp[i])) {
				return false;
			}
		}

		return true;
	}
}

export function topscrollUpdateShownStatus(): void {
	const status = localStorage ? localStorage.getItem('topscrollStatus') : null;
	const currentPeriod = getCurrentPeriodEndTime();
	const currentShowDate = new Date();
	currentShowDate.setHours(0);
	currentShowDate.setMinutes(0);
	currentShowDate.setSeconds(1);
	currentShowDate.setMilliseconds(0);

	let storageInfo: (number | string)[] = [];
	if (status !== null) {
		const statusBreakUp = status.split('|');

		if (currentPeriod > parseFloat(statusBreakUp[0])) {
			storageInfo.push(currentPeriod);
		} else {
			storageInfo = statusBreakUp;
		}
	} else {
		storageInfo.push(currentPeriod);
	}
	// Add the newest
	storageInfo.push(currentShowDate.getTime());

	localStorage.setItem('topscrollStatus', storageInfo.join('|'));
}

interface IPrepareObj {
	adUnitName: string;
	callbackMethod?: () => void;
	tagId: string;
}

export function handleTopScroll(
	topscrollWeekCount: number,
	adUnitName: string,
	defineTag: IDefineTag,
	callbackMethod?: () => void
) {
	const topscrollAllowed = getTopscrollAllowed(topscrollWeekCount);
	if (topscrollAllowed) {
		const { targetId: tagId } = defineTag;

		if (document.getElementById(tagId) && window.lwhb && window.lwhb.cmd) {
			window.lwhb.cmd.push(() => {
				const prepare: IPrepareObj = {
					adUnitName,
					tagId
				};
				if (callbackMethod) {
					prepare.callbackMethod = callbackMethod;
				}
				window.lwhb.prepareAd(prepare);
			});
		}

		return true;
	} else {
		return false;
	}
}
