import {ParameterController} from './parameter.controller.ts';
import {AuthenticationHttpInterceptor} from './authentication.httpinterceptor.ts';

/* @ngInject */
export function AuthenticationConfig ($routeProvider: ng.route.IRouteProvider, $httpProvider) {
	const ParameterizedRoute = {
		template: "",
		controller: ParameterController.NAME,
		controllerAs: 'pc'
	};

	$routeProvider
		.when("/access_token=:parameters*", ParameterizedRoute)
		.when("/expires_in=:parameters*", ParameterizedRoute)
		.when("/state=:parameters*", ParameterizedRoute);

	$httpProvider.interceptors.push(AuthenticationHttpInterceptor.NAME);
}