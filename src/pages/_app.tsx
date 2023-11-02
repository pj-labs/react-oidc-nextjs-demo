import '@/styles/globals.css';
import { AppProps } from 'next/app';
import Layout from '@/components/layout';

export default function App(props: AppProps) {
	const {
		Component,
		pageProps: { session, ...pageProps },
	} = props;

	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}
