import React from 'react';
import { useOidc, useOidcUser } from '@axa-fr/react-oidc';
import { useRouter } from 'next/router';

export default function Dashboard() {
	const { login,logout, isAuthenticated } = useOidc();
	const { oidcUser, oidcUserLoadingState } = useOidcUser();
	const router= useRouter();

	if (!isAuthenticated)
		login();
	return (
		<>
			<div className={'flex justify-center m-5'}>
				<h1>Welcome to Dashboard {oidcUser?.name}</h1>
			</div>
			<hr />
			<div className={'flex justify-center'}>
				<button type={'button'}  onClick={() => router.push('/')}>Go Home</button>
			</div>
		</>
	);
}
