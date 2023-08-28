import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
	const { data: session, status } = useSession({
		required: true,
		onUnauthenticated() {
			// The user is not authenticated, handle it here.
			console.log('Home session:', session);
			console.log('Home status:', status);
			signIn();
		},
	});

	return (
		<>
			<main className={`flex min-h-screen flex-col items-center justify-between p-24`}>
				{session ? (
					<>
						Status: Logged in as {session?.user?.email}
						<button type={'button'} onClick={() => signOut()}>
							Log out
						</button>
					</>
				) : (
					<>
						Status: Not logged in <br />
						<button onClick={() => signIn()}>Log in</button>
					</>
				)}
			</main>
		</>
	);
}
