import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  try {
const SECRET_KEY = process.env.JWT_SECRET || "";

    const token = request.cookies.get("token")?.value

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const decoded = await  jwt.verify(token, SECRET_KEY) as {role :string};

    return NextResponse.json({
      authenticated: true,
      user: {
        role: decoded.role,
      },
    })
  } catch (error) {
    console.log("Token verification failed:", error)
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
