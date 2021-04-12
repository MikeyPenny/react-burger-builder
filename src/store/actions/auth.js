import axios from "axios";

import * as actionTypes from "./actionTypes";

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (authData) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: authData.idToken,
		id: authData.localId,
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

export const logout = () => {
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const checkAuthTimeout = (expires) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout());
		}, expires * 1000);
	};
};

export const auth = (email, password, isSignup) => {
	return async (dispatch) => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};
		
		let url =
			"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCH0VRAqOr3cKlQBcq6XHPEQP_ASQzEp8w";
		if (!isSignup)
			url =
				"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCH0VRAqOr3cKlQBcq6XHPEQP_ASQzEp8w";
		try {
			const response = await axios({
				url: url,
				data: authData,
				method: "post",
			});
			console.log(response);
			dispatch(authSuccess(response.data));
			dispatch(checkAuthTimeout(response.data.expiresIn));
		} catch (err) {
			console.log(err);
			dispatch(authFail(err.response.data.error));
		}
	};
};
