import '@/styles/globals.css';
import { AppProps } from 'next/app';
import AppProvider from '@/components/layout';
import CoreRouteGuard from '@/CoreRouteGuard';
import { FetchInterceptor } from '@/FetchClient';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a React query client
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: true,
			//gcTime: STALE_TIME,
		},
	},
});

export default function App(props: AppProps) {
	const {
		Component,
		pageProps: { session, ...pageProps },
	} = props;

	return (
		<AppProvider>
			<FetchInterceptor>
				<QueryClientProvider client={queryClient}>
				<CoreRouteGuard>
					<Component {...pageProps} />
				</CoreRouteGuard>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</FetchInterceptor>
		</AppProvider>
	);
}
