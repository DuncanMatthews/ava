import { authMiddleware } from '@clerk/nextjs';

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ['/','/sign-in'],
  //  debug: true ,
  // Optional: If you want to redirect users to a different page when they are not authenticated
  //set beforeAuth debug true
  
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};