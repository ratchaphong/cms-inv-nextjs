// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const MAX_SESSION_AGE_MS = 60 * 60 * 1000; // 1 ชม.
const protectedRoutes = [
  "/products",
  "/stocks",
  "/profile",
  "/edit-profile",
  "/dashboard",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;
  const loginTime = request.cookies.get("loginTime")?.value;
  const isLoggedIn = Boolean(token);
  const isLoginPage = pathname.includes("/login");

  // ✅ ตรวจ session timeout
  if (isLoggedIn && loginTime) {
    const loginTimestamp = Number(loginTime);
    const now = Date.now();
    const hasExpired = now - loginTimestamp > MAX_SESSION_AGE_MS;

    if (hasExpired) {
      console.log("⛔ Session expired. Redirecting to login.");
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token");
      response.cookies.delete("loginTime");
      return response;
    }
  }

  // 🛑 ถ้าเข้า /login แล้ว login อยู่แล้ว → ไปหน้า profile
  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // 🔒 ถ้าหน้า protected แต่ยังไม่ได้ login → redirect ไป login
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|images|public|api).*)"],
};
