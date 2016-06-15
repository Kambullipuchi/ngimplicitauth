import * as moment from 'moment';

export class AuthenticationService {
	static NAME: string = 'AuthenticationService';

	/* @ngInject */
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

	public isAuthenticated () : boolean {
		let localStorageAccessToken = this.$localStorage.access_token;
		let localStorageAccessTokenExpirationDate = this.$localStorage.access_token_expiration_date;

		let authenticated: boolean = !!localStorageAccessToken &&
			!!localStorageAccessTokenExpirationDate &&
			moment(localStorageAccessTokenExpirationDate) > moment();

		return authenticated;
	}

	public getAccessToken () : string {
		let localStorageAccessToken = this.$localStorage.access_token;

		if (!this.isAuthenticated()) {
			this.redirectToLogin();
			return undefined;
		}

		return localStorageAccessToken;
	}

	public redirectToLogin () : void {
		let scope = encodeURIComponent("openid profile");
		let state = encodeURIComponent(this.$window.location.href.replace(/&/g, ";"));
		let redirect = encodeURIComponent(this.REDIRECT_URI);
		let redirectToUrl = this.LOGIN_URL + "?client_id=" + this.CLIENT_ID + "&scope=" + scope + "&response_type=token&pfidpadapterid=OAuthAdapterCCDS&redirect_uri=" + redirect + "&client_id=" + this.CLIENT_ID + "&state=" + state; 
		this.$window.location.href = redirectToUrl;
	}

	public logout () : void {
		this.$localStorage.$reset();
		this.$sessionStorage.$reset();
		let logoutUrl = this.LOGOUT_URL;
		
		const self = this;
		this.$timeout(function () {
			self.$window.location.href = logoutUrl;
		});
	}
} 