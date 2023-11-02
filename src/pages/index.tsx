import { useOidc, useOidcUser } from '@axa-fr/react-oidc';


export default function Home() {
	const { login,logout, isAuthenticated } = useOidc();
	const { oidcUser, oidcUserLoadingState } = useOidcUser();

	if (!isAuthenticated)
		login();
	return (
		<>
			<main className={`flex min-h-screen flex-col items-center justify-between p-24`}>
				{isAuthenticated ? (
					<>
						<p>Status: Logged in as {oidcUser?.name} <br />
							Email: {oidcUser?.email} <br />
							Username: {oidcUser?.username} <br />
							First Name: {oidcUser?.given_name} <br />
							Last Name: {oidcUser?.family_name} <br />
						</p>

						<button type={'button'} onClick={() => logout()}>
							Log out
						</button>
					</>
				) : (
					<>
						Status: Not logged in <br />
						<button onClick={() => login()}>Log in</button>
					</>
				)}
			</main>
		</>
	);
}
