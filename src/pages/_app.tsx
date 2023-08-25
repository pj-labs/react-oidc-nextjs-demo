import "@/styles/globals.css";
import {SessionProvider} from "next-auth/react";
import {AppProps} from "next/app";

interface MyAppProps extends AppProps {
}

export default function App(props: MyAppProps) {
    const {
        Component,
        pageProps: {session, ...pageProps},
    } = props;

    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
}
