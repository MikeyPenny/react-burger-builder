import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
	it('should return initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			token: null,
			userId: null,
			error: null,
			loading: false,
			authRedirectPath: '/',
		});
	});

	it('should store token upon login', () => {
		expect(
			reducer(
				{
					token: null,
					userId: null,
					error: null,
					loading: false,
					authRedirectPath: '/',
				},
				{
					type: actionTypes.AUTH_SUCCESS,
					idToken: 'some-token',
					id: 'some-user-Id',
				}
			)
		).toEqual({
			token: 'some-token',
			userId: 'some-user-Id',
			error: null,
			loading: false,
			authRedirectPath: '/',
		});
	});
});
