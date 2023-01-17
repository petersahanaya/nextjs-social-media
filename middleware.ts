<<<<<<< HEAD
export { default } from "next-auth/middleware";
=======
export { default } from "next-auth/middleware"

>>>>>>> 0ed24146f3b65397b9e87eebc04f5cf7ce9dc980
export const config = {
  matcher: [
    "/profile/:path*",
    "/user/:path*",
    "/comment/:path*",
    "/friends/:path*",
    "/post/:path*",
  ],
};
