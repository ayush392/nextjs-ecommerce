import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // let cookie = request.cookies.get("nextJsAuth");
  let role = request.cookies.get("role");

  const pathname = request.nextUrl.pathname;
  // console.log(pathname);

  if (pathname === "/dashboard") {
    if (role?.value === "Admin") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
