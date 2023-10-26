import {signIn, signOut, useSession} from 'next-auth/react';
import {useEffect} from 'react';

export default function Home() {
	const { data: session, status,update } = useSession({
		required: true,
		onUnauthenticated() {
			console.log('Home status:', status);
			signIn('pres');
		},
	});

	useEffect(() => {
		update('pres');
	},[]);

	return (
		<>
			<main className={`flex min-h-screen flex-col items-center justify-between p-24`}>
				{session ? (
					<>
						Status: Logged in as {session?.user?.profile?.username}
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
