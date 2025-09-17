
// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(req: NextRequest) {
//   console.log("Middleware running on:", req.nextUrl.pathname);

//   try {

//     console.log("jwt verify");
//     const verify = async () => {
//       const res = await fetch("http://localhost:3000/api/auth/verify")
//       const data = await res.json();
//       console.log(data);
//       console.log("here");
//       return data;
//     }
//     // console.log("Decoded token:", decoded);
//     const role = verify();
//     if (await role !== "admin") {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//     return NextResponse.next();
//   } catch (error) {
//     console.log("JWT verification failed:", error);
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
// }

// export const config = {
//   matcher: ["/admin", "/admin/:path*"], // protect /admin routes
// };


import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  console.log("Middleware running on:", req.nextUrl.pathname);
  
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    // console.log("Decoded token:", payload);

    if (payload.role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log("JWT verification failed:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
