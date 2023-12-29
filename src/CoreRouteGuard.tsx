import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useOidc } from '@axa-fr/react-oidc';
import { User } from '@/User';
import { UserService } from '@/services/UserService';

/**
 * Authenticate and Authorize the user. If user not logged-in, redirect to login page
 *
 * @author Pavan Kumar Jadda
 * @since 0.2.14
 */
export default function CoreRouteGuard(props: { children: React.ReactNode }): React.JSX.Element {
	const [validToken, setValidToken] = React.useState(true);
	const { login, isAuthenticated } = useOidc();
	const router = useRouter();

	/**
	 * Check if the access token is expired or not and redirect to login page if expired
	 */
	useEffect(() => {
		// Update the user information in redux store and cookie when session is authenticated and data is available
		if (isAuthenticated) {
			console.log('isAuthenticated');
			UserService.getUserInformation().then((data: User) => {
				if (data !== undefined) {
					// Remove the groups from the user object to match cookie size limit
					data.groups = [];

					// Check if the user is authorized to access the application
					/*if (data?.authorities?.find((authority: Authority) => authority?.name === ROLE_CRMS_CORE_USER) === undefined)
						router.push('/unauthorized');*/
				} else
					login().then(() => {
						setValidToken(true);
					});
			});
		} else {
			login().then(() => {
				setValidToken(true);
			});
		}
	}, [router,isAuthenticated]);

	return (validToken && isAuthenticated ? props.children : <></>) as React.JSX.Element;
}

