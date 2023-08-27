import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
	const { data: session } = useSession();

	if (!session && typeof window !== 'undefined') {
		signIn();
	}

	function getComponent() {
		if (session) {
			return (
				<>
					Status: Logged in as {session?.user?.email}
					<button type={'button'} onClick={() => signOut()}>
						Log out
					</button>
				</>
			);
		}
		return (
			<>
				Status: Not logged in <br />
				<button onClick={() => signIn()}>Log in</button>
			</>
		);
	}

	return (
		<>
			<main className={`flex min-h-screen flex-col items-center justify-between p-24`}>{getComponent()}</main>
		</>
	);
}
