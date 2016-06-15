import * as moment from 'moment';
import * as _ from 'lodash';

export class ParameterController {
	static NAME: string = 'ParameterController';

	/* @ngInject */
	constructor (
			private $location: ng.ILocationService,
			private $localStorage,
			private $window: ng.IWindowService
		) {
		
		let keyValueList = this.parseUrl(decodeURIComponent($location.path()));

		$localStorage.access_token = _.find(keyValueList, {
			key: "/access_token"
		}).value;

		$localStorage.access_token_expiration_date = moment().add(_.find(keyValueList, { 
			key: "expires_in" 
		}).value, "seconds");

		let statePresent = _.findLastIndex(keyValueList, o => o.key === 'state');

		if (statePresent !=== -1) {
			let redirectUrl = _.find(keyValueList, { key: "state" }).value.replace(/;/g, '&');
			if (this.shouldRedirectWindowLocation($window.location.href, redirectUrl)) {
				this.$window.location.href = redirectUrl;
			} else {
				$location.url(this.getRoutePath(redirectUrl));
				this.$location.replace;
			}
		} else {
			this.$window.location.href = `${this.$location.protocol()}://${this.$location.host()}`;
		}
	}

	private parseUrl(url: string): any {
		let parameters = url.split('&');
		let result = _.map(parameters, parameter => {
			let item = parameter.split(/=(.*)/);
			return {
				key: item[0],
				value: item[1]
			};
		});
		return result;
	}
  
	public shouldRedirectWindowLocation(currentUrl: string, redirectUrl: string): boolean {
		let currentHostAndPath = currentUrl.split('#')[0];
		let redirectHostAndPath = redirectUrl.split('#')[0];

		return currentHostAndPath != redirectHostAndPath;
	}

	private getRoutePath(fullUrl: string): string {
		let routePathLink = this.$window.document.createElement("a");
		routePathLink.href = fullUrl;

		let hashPartUrl: string[] = routePathLink.hash.split("#");
		return hashPartUrl[1];
	}

}