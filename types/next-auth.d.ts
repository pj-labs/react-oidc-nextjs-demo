import { DefaultSession, Profile } from 'next-auth';
import { DefaultJWT } from 'next-auth/src/jwt/types';

declare module 'next-auth' {
	interface Profile {
		sub: string;
		email: string;
		email_verified: boolean;
		family_name: string;
		given_name: string;
		name: string;
		nickname: string;
		company: string;
		department: string;
		picture: null | string;
		username: string;
		at_hash: string;
		aud: string;
		exp: number;
		iat: number;
		iss: string;
	}

	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			accessToken: string | unknown;
			id: string | unknown;
			profile: Profile | undefined;
		} & DefaultSession['user'];
	}
}

declare module 'next-auth/jwt' {
	interface JWT extends Record<string, unknown>, DefaultJWT {
		accessToken: string | undefined;
		profile: Profile | undefined;
	}
}
