/** @format */

import { authConstants } from "../actions/constants";

const initState = {
	token: null,
	user: {
		firstName: "",
		lastName: "",
		email: "",
		picture: "",
	},
	athenticate: false,
	authenticating: false,
	loading: false,
	error: null,
	message: "",
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
	// eslint-disable-next-line default-case
	switch (action.type) {
		case authConstants.LOGIN_REQUEST:
			state = {
				...state,
				authenticating: true,
			};
			break;
		case authConstants.LOGIN_SUCCESS:
			state = {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				authenticate: true,
				authenticating: false,
			};
			break;
		case authConstants.LOGOUT_REQUEST:
			state = {
				...initState,
				loading: true,
			};
			break;
		case authConstants.LOGOUT_SUCCESS:
			state = {
				...initState,
			};
			break;
		case authConstants.LOGOUT_FAILURE:
			state = {
				...initState,
				error: action.payload.error,
				loading: false,
			};
			break;
	}
	return state;
};
