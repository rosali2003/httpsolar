import { NextRequest, NextResponse } from "next/server";
import { getImageFilename, getS3ImageUrl } from "@/lib/images";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const statusCode = Number(code);

  if (!Number.isInteger(statusCode) || statusCode < 100 || statusCode > 599) {
    return new NextResponse("Invalid status code", { status: 400 });
  }

  const s3Url = getS3ImageUrl(statusCode);
  if (s3Url) {
    return NextResponse.redirect(s3Url, 307);
  }

  const filename = getImageFilename(statusCode);
  if (!filename) {
    return new NextResponse("Image not found", { status: 404 });
  }

  return NextResponse.redirect(new URL(`/images/${filename}`, _req.url), 307);
}
