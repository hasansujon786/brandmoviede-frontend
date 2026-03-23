import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isMaintenance = true;

  // If NOT in maintenance → allow everything
  if (!isMaintenance) {
    return NextResponse.next();
  }

  // Allow coming soon page
  if (pathname === "/coming-soon") {
    return NextResponse.next();
  }

  // Allow dashboard (optional — remove if you want full lock)
  if (pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  // Allow static & system files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Redirect everything else → /coming-soon
  return NextResponse.redirect(new URL("/coming-soon", request.url));
}
