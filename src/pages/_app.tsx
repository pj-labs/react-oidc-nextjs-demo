import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';

export default function App(props: AppProps) {
	const {
		Component,
		pageProps: { session, ...pageProps },
	} = props;

	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />
		</SessionProvider>
	);
}
