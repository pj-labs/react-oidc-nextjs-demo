import NextAuth from 'next-auth';

export default NextAuth({
	providers: [
		/*GithubProvider({
			clientId: 'd6ca8737e1b3321d6ae7',
			clientSecret: '6976ce59f65264945ef829b0d28fe63f2d3aaf17',
		}),
		{
			id: 'd6ca8737e1b3321d6ae7',
			clientId: 'd6ca8737e1b3321d6ae7',
			clientSecret: '6976ce59f65264945ef829b0d28fe63f2d3aaf17',
			name: 'Github',
			type: 'oauth',
			token: 'https://github.com/login/oauth/access_token',
			userinfo: 'https://api.github.com/user',
			authorization: {
				url: 'https://github.com/login/oauth/authorize',
				params: { scope: 'openid profile email offline' },
			},
			profile(profile) {
				console.log('profile ', profile);
				return {
					id: profile.id,
					name: profile.name,
					email: profile.email,
				};
			},
		},*/
		{
			id: 'pres',
			client: {
				client_id: 'pres-local',
				token_endpoint_auth_method: 'none',
			},
			name: 'NCATS',
			type: 'oauth',
			idToken: true,
			wellKnown: 'https://auth.ncats.nih.gov/_api/v2/auth/NCI-CCR-TEST/.well-known/openid-configuration',
			authorization: { params: { scope: 'openid profile email offline_access external_groups access_roles groups custom_claims provider_claims' } },
			userinfo: 'https://auth.ncats.nih.gov/_api/v2/auth/NCI-CCR-TEST/userinfo',
			profile(profile) {
				return {
					id: profile.username,
					name: profile.name,
					email: profile.email,
				};
			},
		},
	],
	debug: true,
	callbacks: {
		async signIn({ account }) {
			return !!(account && account?.access_token);
		},
		async redirect({ url, baseUrl }) {
			// Allows relative callback URLs
			if (url.startsWith('/')) return `${baseUrl}${url}`;
			// Allows callback URLs on the same origin
			else if (new URL(url).origin === baseUrl) return url;
			return baseUrl;
		},
		async jwt({ token, user, account, profile }) {
			// Saves accessToken and profile in session object
			if (account?.access_token) {
				token.accessToken = account.access_token;
				token.profile = profile;
			}
			console.log('jwt user:', user);
			console.log('jwt account:', account);
			console.log('jwt profile:', profile);
			return token;
		},
		async session({ session, token, user }) {
			if (token && session.user) {
				session.user.accessToken = token.accessToken;
				session.user.profile = token.profile;
			}
			//console.log('token:', token);
			return session;
		},
	},
});
