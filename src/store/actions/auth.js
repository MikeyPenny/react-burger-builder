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
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userId');
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

export const setAuthRedirectAuth = path => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path,
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
			
			const expDate = new Date(
				new Date().getTime() + response.data.expiresIn * 1000
			);
			localStorage.setItem('token', response.data.idToken);
			localStorage.setItem('expirationDate', expDate);
			localStorage.setItem('userId', response.data.localId);
			dispatch(authSuccess(response.data));
			dispatch(checkAuthTimeout(response.data.expiresIn));
		} catch (err) {
			dispatch(authFail(err.response.data.error));
		}
	};
};

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');

		if (!token) {
			dispatch(logout());
		} else {
			const expTime = new Date(localStorage.getItem('expirationDate'));
			if (expTime <= new Date()) {
				dispatch(logout());
			} else {
				const userId = localStorage.getItem('userId');
				dispatch(authSuccess(token, userId));
				dispatch(
					checkAuthTimeout(
						(expTime.getTime() - new Date().getTime()) / 1000
					)
				);
			}
		}
	};
};
