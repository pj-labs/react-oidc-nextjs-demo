import {Inter} from 'next/font/google'
import {signIn, useSession} from "next-auth/react";
import {useEffect} from 'react';

const inter = Inter({subsets: ["latin"]});

export default function Home() {
    const {data: session} = useSession();

    useEffect(() => {
        if (!session) {
            signIn();
        }
    }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
        <h1>Welcome Home</h1>
    </main>
  );
}
