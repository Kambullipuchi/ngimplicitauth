import * as moment from 'moment';

export class AuthenticationService {
	static NAME: string = 'AuthenticationService';

	constructor(
			private $location: ng.ILocationService,
			private $timeoute: ng.ITimeoutService,
			private $window: ng.IWindowService,
			private LOGIN_URL: string,
			private LOGOUT_URL: string,
			private REDIRECT_URI: string,
			private CLIENT_ID: string,
			private $localStorage: any,
			private $sessionStorage: any,
			private $cookies: any
		) {

	}

	public isAuthenticated() : boolean {
		let localStorageAccessToken = this.$localStorage.access_token;
		let localStorageAccessTokenExpirationDate = this.$localStorage.access_token_expiration_date;

		let authenticated;
	}
}