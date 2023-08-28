import NextAuth from 'next-auth';

export default NextAuth({
	providers: [
		/*GithubProvider({
			clientId: 'd6ca8737e1b3321d6ae7',
			clientSecret: '6976ce59f65264945ef829b0d28fe63f2d3aaf17',
		}),*/
		{
			id: 'd6ca8737e1b3321d6ae7',
			clientId: 'd6ca8737e1b3321d6ae7',
			clientSecret: '6976ce59f65264945ef829b0d28fe63f2d3aaf17',
			name: 'Github',
			type: 'oauth',
			token: 'https://github.com/login/oauth/access_token',
			userinfo: 'https://api.github.com/user',
			//token: "https://auth.ncats.nih.gov/_api/v2/auth/NCI-CCR-TEST/oidc/token",
			//userinfo: "https://auth.ncats.nih.gov/_api/v2/auth/NCI-CCR-TEST/me",
			authorization: {
				url: 'https://github.com/login/oauth/authorize',
				params: { scope: 'openid profile email offline' },
			},
			//issuer: "https://auth.ncats.nih.gov/_api/v2/auth/NCI-CCR-TEST",
			profile(profile) {
				console.log('profile ', profile);
				return {
					id: profile.id,
					name: profile.name,
					email: profile.email,
				};
			},
		},
		{
			id: 'next-auth-demo',
			clientId: 'next-auth-demo',
			clientSecret: '73bf8dc7-43e0-48d9-862a-ceaef766c97a',
			name: 'NCATS',
			type: 'oauth',
			idToken: true,
			wellKnown: 'https://auth.ncats.nih.gov/_api/v2/auth/NCI-CCR-TEST/.well-known/openid-configuration',
			authorization: { params: { scope: 'openid email profile' } },
			profile(profile) {
				console.log('profile:', profile);
				return {
					id: profile.email,
					name: profile.name,
					email: profile.email,
				};
			},
		},
	],
	debug: true,
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			console.log('account:', account);
			return true;
		},
		async redirect({ url, baseUrl }) {
			return baseUrl;
		},
		async session({ session, token, user }) {
			console.log('session:', session);
			return session;
		},
		async jwt({ token, user, account, profile, isNewUser }) {
			if (account?.accessToken) {
				token.accessToken = account.accessToken;
			}
			return token;
		},
	},
});
