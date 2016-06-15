import {AuthenticationService} from "./authentication.service.ts";

export class AuthenticationHttpInterceptor implements ng.IHttpInterceptor {
    static NAME: string = "AuthenticationHttpInterceptor";

    /* @ngInject */
    public static factory (
            $rootScope: ng.IRootScopeService,
            AUTHENTICATED_URLS: RegExp,
            AUTHENTICATED_URLS_EXCEPTIONS: RegExp,
            AuthenticationService: AuthenticationService
        ): AuthenticationHttpInterceptor {

            return new AuthenticationHttpInterceptor (
                    $rootScope,
                    AUTHENTICATED_URLS,
                    AUTHENTICATED_URLS_EXCEPTIONS,
                    AuthenticationService
                );
    }

    /* @ngInject */
    constructor (
            private $rootScope: ng.IRootScopeService,
            private AUTHENTICATED_URLS: RegExp,
            private AUTHENTICATED_URLS_EXCEPTIONS: RegExp,
            private AuthenticationService: AuthenticationService
        ) {

    }

    public request = (config: ng.IRequestConfig) => {
        let shouldAuthenticate: boolean = false;

        if (config && config.url && this.AUTHENTICATED_URLS && this.AUTHENTICATED_URLS_EXCEPTIONS) {
            shouldAuthenticate =  this.AUTHENTICATED_URLS.test(config.url) && !this.AUTHENTICATED_URLS_EXCEPTIONS.test(config.url);
        }

        if (!shouldAuthenticate) {
            return config;
        }

        config.headers = config.headers || {};

        const accessToken = this.AuthenticationService.getAccessToken();
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
    }

    public responseError = (response) => {
        if (response.status === 401) {
            this.AuthenticationService.redirectToLogin();
        }
        return response;
    }
}