import { NextResponse } from "next/server";

export function middleware(request) {
  // Get the token from cookies
  const token = request.cookies.get("token")?.value;

  // Define protected routes
  const protectedRoutes = ["/superadmin"];

  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (!token) {
      console.log("User not authenticated, redirecting to login...");
      return NextResponse.redirect(new URL("/login", request.url)); // Redirect to login
    }
  }

  return NextResponse.next();
}

// Apply middleware to protect /superadmin
export const config = {
  matcher: ["/superadmin"], 
};
