import * as moment from "moment";

import { AuthenticationService } from "./authentication.service.ts";

/* @ngInject */
export function AuthenticationRouteResolver (
	$q: ng.IQService,
	AuthenticationService: AuthenticationService, 
	$window: ng.IWindowService): ng.IPromise<string> {
	
	let deferred = $q.defer();

	let accessToken = AuthenticationService.getAccessToken();
	if (accessToken) {
		deferred.resolve();
	} else {
		deferred.reject();
	}

	return deferred.promise;
}

