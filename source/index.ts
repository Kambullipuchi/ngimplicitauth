import {AuthenticationHttpInterceptor} from './authentication.httpinterceptor.ts';
import {AuthenticationService} from './authentication.service.ts';
import {AuthenticationConfig} from './authentication.config.ts';
import {ParameterController} from './parameter.controller.ts';

const ngRoute = require('angular-route');
const ngCookies = require('angular-cookies');
const ngStorage = require('ngstorage');

export default 
	angular
		.module('ngimplicitauth', [
			ngRoute,
			ngCookies,
			ngStorage
		])
		.constant('LOGIN_URL', LOGIN_URL)
		.constant('LOGOUT_URL', LOGOUT_URL)
		.constant('REDIRECT_URI', REDIRECT_URI)
		.constant('CLIENT_ID', CLIENT_ID)
		.constant('AUTHENTICATED_URLS', AUTHENTICATED_URLS)
		.constant('AUTHENTICATED_URLS_EXCEPTIONS', AUTHENTICATED_URLS_EXCEPTIONS)
		.controller(ParameterController.NAME, ParameterController)
		.service(AuthenticationService.NAME, AuthenticationService)
		.factory(AuthenticationHttpInterceptor.NAME, AuthenticationHttpInterceptor.factory)
		.config(AuthenticationConfig)
		.name;