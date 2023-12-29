import ky, { HTTPError } from 'ky';
import { useOidc, useOidcIdToken } from '@axa-fr/react-oidc';

/**
 * Reusable fetch client

 * @param url URL of the request
 *
 * @author Pavan Kumar Jadda
 * @since 0.2.19
 */
export let FetchClient = ky.create({
	credentials: 'omit',
	timeout: false,
});

/**
 * Adds error handling interceptor
 *
 * @author Pavan Kumar Jadda
 * @since 1.1.1
 */
export const FetchInterceptor = (props: { children: React.JSX.Element }) => {
	const { idToken } = useOidcIdToken();
	const { login } = useOidc();

	FetchClient = FetchClient.extend({
		hooks: {
			beforeRequest: [
				(request) => {
					request.headers.set('Authorization', `Bearer ${idToken}`);
				},
			],
			beforeError: [
				(error: HTTPError) => {
					const { response } = error;
					if (response && response.status === 401) {
						login();
					}
					return error;
				},
			],
		},
	});

	return props.children;
};
