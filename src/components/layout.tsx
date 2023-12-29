import { OidcProvider } from '@axa-fr/react-oidc';
import { useRouter } from 'next/router';
import React from 'react';

const configuration = {
	client_id: 'pres',
	redirect_uri: 'https://localhost:3001/authentication/callback',
	silent_redirect_uri: 'https://localhost:3001/authentication/silent-callback',
	scope: 'openid profile email api offline_access',
	authority: 'https://auth.ncats.nih.gov/_api/v2/auth/NCI-CCR-TEST',
};

export default function AppProvider(props: { children: React.ReactNode }) {
	const router = useRouter();
	const withCustomHistory = () => {
		return {
			replaceState: (url: any) => {
				router
					.replace({
						pathname: url,
					})
					.then(() => {
						// eslint-disable-next-line no-undef
						window.dispatchEvent(new Event('popstate'));
					});
			},
		};
	};

	/**
	 * This function is called when the user is logged out from another tab or the session is lost
	 *
	 * @param _configuration event configuration
	 * @param name event name
	 * @param _data additional data
	 */
	function onEvent(_configuration: string, name: string, _data: any) {
		console.log(`_configuration:${_configuration} and name:${name} and _data: ${JSON.stringify(_data)}`);
		if (name === 'logout_from_another_tab' || name === 'logout_from_same_tab' || name === 'session_lost') {
			window.location.reload();
		}
	}

	return (
		<>
			<OidcProvider
				authenticatingComponent={Loading}
				loadingComponent={Loading}
				callbackSuccessComponent={Loading}
				configuration={configuration}
				onEvent={onEvent}
				withCustomHistory={withCustomHistory}>
				<>{props.children}</>
			</OidcProvider>
		</>
	);
}

function Loading() {
	return (
		<div style={{ margin: '20px' }} className={'custom-flex-justify-center'}>
			Please wait...
		</div>
	);
}
