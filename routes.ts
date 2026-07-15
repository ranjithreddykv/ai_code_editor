// An Array of routes that are accessible to public
// Routes which don't need authentication

export const publicRoutes: string[] = [];

//An Array of routes that are protected
//These routes require authentication

export const protectedRoutes: string[] = ["/"];

//An Array of routes that are accessible to public
//Routes that start with (/api/auth) prefix do not require authentication

export const authRoutes: string[] = ["/auth/sign-in"];
export const apiAuthPrefix: string = "/api/auth";
export const DEFAULT_LOGIN_REDIRECT = "/";
