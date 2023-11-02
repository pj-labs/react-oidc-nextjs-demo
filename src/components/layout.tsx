import { OidcProvider } from '@axa-fr/react-oidc';
import { useRouter } from 'next/router';
import React from 'react';
import Loading from '@/components/Loading';

const configuration = {
	client_id: 'pres',
	redirect_uri: 'https://localhost:3000/authentication/callback',
	silent_redirect_uri: 'https://localhost:3000/authentication/silent-callback',
	scope: 'openid profile email api offline_access',
	authority: 'https://auth.ncats.nih.gov/_api/v2/auth/NCI-CCR-TEST',
};

export default function Layout({ children }) {
	const router = useRouter();
	const withCustomHistory = () => {
		return {
			replaceState: (url: any) => {
				router.replace({
					pathname: url,
				}).then(() => {
					// eslint-disable-next-line no-undef
					window.dispatchEvent(new Event('popstate'));
				});
			},
		};
	};
	return (<>
			<OidcProvider loadingComponent={Loading}
										configuration={configuration} withCustomHistory={withCustomHistory}>
				<main>{children}</main>
			</OidcProvider>
		</>);
}
