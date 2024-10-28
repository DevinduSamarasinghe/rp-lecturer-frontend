import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({

    //even if there is no logged in session, these routes will be accessible
    publicRoutes: [
        '/',
        '/api/webhook/clerk',
        '/api/server/event',
    ],

    //these routes will be ignored by the middleware
    ignoredRoutes: [
        '/api/webhook/clerk',
        '/api/server/sessions'
    ]
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 