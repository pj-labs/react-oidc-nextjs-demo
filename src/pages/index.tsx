import Home from '@/components/Home';
import React from 'react';
import { useOidc } from '@axa-fr/react-oidc';

export default function IndexPage() {
	const { logout } = useOidc();

	return (
		<>
			<main className={`flex min-h-screen flex-col items-center justify-between p-24`}>
				<Home />

				<button type={'button'} onClick={() => logout()}>
					Log out
				</button>
			</main>
		</>
	);
}
