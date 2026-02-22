import { NextRequest, NextResponse } from "next/server";
import { getImageKey, getImageStream } from "@/lib/s3";
import { Readable } from "stream";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const statusCode = Number(code);

  if (!Number.isInteger(statusCode) || statusCode < 100 || statusCode > 599) {
    return new NextResponse("Invalid status code", { status: 400 });
  }

  const key = await getImageKey(statusCode);
  if (!key) {
    return new NextResponse("Image status not found", { status: 404 });
  }

  const image = await getImageStream(key);
  if (!image) {
    return new NextResponse("Could not find image", { status: 404 });
  }

  const headers: HeadersInit = {
    "Content-Type": image.contentType,
    "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
  };
  if (image.contentLength) {
    headers["Content-Length"] = String(image.contentLength);
  }

  // Convert Node.js Readable to Web ReadableStream
  const webStream = Readable.toWeb(image.body) as ReadableStream;
  return new NextResponse(webStream, { headers });
}
