import React from 'react';
import { useOidc, useOidcUser } from '@axa-fr/react-oidc';
import { useQuery } from '@tanstack/react-query';
import { UserService } from '@/services/UserService';

export default function Home() {
	const { login,logout, isAuthenticated } = useOidc();
	const { oidcUser, oidcUserLoadingState } = useOidcUser();

	useQuery({
		queryKey: ['user'],
		queryFn: () => UserService.getUserInformation(),
		staleTime: 60000,
	});

	return (
		<div>{isAuthenticated ? (
			<>
				<p>Status: Logged in as {oidcUser?.name} <br />
					Email: {oidcUser?.email} <br />
					Username: {oidcUser?.username} <br />
					First Name: {oidcUser?.given_name} <br />
					Last Name: {oidcUser?.family_name} <br />
				</p>

				<br />
				<br />
				<br />
				<ul>
					<li>
						<a href={'/dashboard'}>View Dashboard</a>
					</li>
				</ul>


			</>
		) : (
			<>
				Status: Not logged in <br />
				<button onClick={() => login()}>Log in</button>
			</>
		)}</div>
	);
}
