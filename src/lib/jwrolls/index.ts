import { rollsHandler } from './rollshandler';
import type { TRollsHandler } from './types';

export { rollsHandler } from './rollshandler';

export class JWRolls {
	private rollsOptions: TRollsHandler;

	constructor(jwRollsOptions: TRollsHandler) {
		this.rollsOptions = jwRollsOptions;
	}

	public createAdvertisingObject(
		jwPlayerInstance: jwplayer.JWPlayer,
		jwRollsOptions: Partial<TRollsHandler>
	) {
		this.updateRollsOptions(jwRollsOptions);
		rollsHandler(this.rollsOptions, jwPlayerInstance);
	}

	public updateRollsOptions(jwRollsOptions: Partial<TRollsHandler>) {
		this.rollsOptions = { ...this.rollsOptions, ...jwRollsOptions };
	}
}
