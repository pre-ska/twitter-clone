import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // dodajem dodatna polja na user objekt od next autha
    // želim imati username - dobiven od name (izbacim space)
    // želim imati id - dobiven od tokena.sub
    async session({ session, token }) {
      // session.user.username = 'aaaaaaaaaaaaaaa';
      // console.log(session);
      if (session) {
        session.user.username = session?.user?.name
          ?.split(' ')
          .join('')
          .toLowerCase();
        session.user.uid = token.sub;
        return session;
      }
    },
  },
};

export default NextAuth(authOptions);
