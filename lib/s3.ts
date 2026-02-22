import { S3Client, GetObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

let s3Client: S3Client | null = null;

function getS3Client(): S3Client {
  if (!s3Client) {
    s3Client = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }
  return s3Client;
}

function getBucket(): string {
  return process.env.S3_BUCKET_NAME!;
}

/** Returns the S3 key for a status code image, trying .jpg then .jpeg. */
export async function getImageKey(code: number): Promise<string | null> {
  const s3 = getS3Client();
  const bucket = getBucket();
  
  for (const ext of ["jpg", "jpeg"]) {
    const key = `${code}.${ext}`;
    try {
      await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
      return key;
    } catch (error) {
      console.error(`Error getting image key for ${code}.${ext}:`, error);
      // not found, try next extension
    }
  }
  return null;
}

/** Streams an S3 object. Returns null if the key doesn't exist. */
export async function getImageStream(
  key: string
): Promise<{ body: Readable; contentType: string; contentLength?: number } | null> {
  const s3 = getS3Client();
  const bucket = getBucket();
  
  try {
    const response = await s3.send(
      new GetObjectCommand({ Bucket: bucket, Key: key })
    );
    return {
      body: response.Body as Readable,
      contentType: response.ContentType ?? "image/jpeg",
      contentLength: response.ContentLength,
    };
  } catch {
    return null;
  }
}
