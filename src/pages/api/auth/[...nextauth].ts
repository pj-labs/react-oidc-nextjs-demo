import NextAuth from "next-auth";

export default NextAuth({
  providers: [
    {
      id: "ncats-next-auth-test",
      clientId: "next-auth-test",
      clientSecret: "Avlx5A6R0whQwLy-3zaQI",
      name: "NCATS",
      type: "oauth",
      token: "https://auth.ncats.nih.gov/_api/v2/auth/NCI-CCR-TEST/oidc/token",
      userinfo: "https://auth.ncats.nih.gov/_api/v2/auth/NCI-CCR-TEST/me",
      authorization: {
        url: "https://auth.ncats.nih.gov/_api/v2/auth/NCI-CCR-TEST/authorize",
        params: {scope: "openid profile email offline"},
      },
      issuer: "https://auth.ncats.nih.gov/_api/v2/auth/NCI-CCR-TEST",
      profile(profile) {
        console.log('profile ', profile)
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        };
      },
    }
  ],
  debug: true,
  callbacks: {
    async signIn({user, account, profile, email, credentials}) {
      console.log('user', user, account, profile)
      return true
    },
    async redirect({url, baseUrl}) {
      return baseUrl
    },
    async session({session, token, user}) {
      return session
    },
    async jwt({token, user, account, profile, isNewUser}) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken
      }
      return token
    },
  },
});
