import { NextResponse } from "next/server";
import { RESUME_URL } from "@/config/site";

export function GET() {
  return NextResponse.redirect(RESUME_URL, 308);
}
