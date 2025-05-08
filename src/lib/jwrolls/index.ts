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
		playerElementId: string,
		jwRollsOptions?: Partial<TRollsHandler>
	) {
		if (jwRollsOptions) this.updateRollsOptions(jwRollsOptions);
		rollsHandler(this.rollsOptions, jwPlayerInstance, playerElementId);
	}

	public updateRollsOptions(jwRollsOptions: Partial<TRollsHandler>) {
		this.rollsOptions = { ...this.rollsOptions, ...jwRollsOptions };
	}
}
