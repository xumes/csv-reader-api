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

export class ParamNotANumberError extends Error {
	public static readonly Msg =
		'One or more data in the CSV file is not a number.'

	constructor() {
		super(ParamNotANumberError.Msg)
	}
}

export class RouteNotFoundError extends Error {
	public static readonly Msg = 'Route does not exist.'

	constructor() {
		super(RouteNotFoundError.Msg)
	}
}

export class ServerError extends Error {
	public static readonly Msg = 'Internal Server Error.'

	constructor() {
		super(ServerError.Msg)
	}
}
