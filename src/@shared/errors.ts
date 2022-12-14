export class ParamMissingError extends Error {
	public static readonly Msg =
		'One or more of the required parameters was missing.'
  
	constructor() {
		super(ParamMissingError.Msg)
	}
}
  
export class ParamInvalidError extends Error {
	public static readonly Msg =
		'One or more of the required parameters is invalid.'
  
	constructor() {
		super(ParamInvalidError.Msg)
	}
}
