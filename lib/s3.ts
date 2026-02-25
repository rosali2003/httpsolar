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
  if (code === 200) {
    return "200.jpg";
  }
  if (code === 307) {
    return "307.gif";
  }
  return `${code}.jpeg`;
}

/** Streams an S3 object. Returns null if the key doesn't exist. */
export async function getImageStream(
  key: string
): Promise<{ body: Readable; contentType: string; contentLength?: number } | null> {
  const s3 = getS3Client();
  const bucket = getBucket();
  
  try {
    const response = await s3.send(
      new GetObjectCommand({ Bucket: bucket, Key: key, ResponseContentType: "image/jpeg" })
    );
    return {
      body: response.Body as Readable,
      contentType: response.ContentType ?? "image/jpeg",
      contentLength: response.ContentLength,
    };
  } catch (error) {
    console.error(`Error getting image stream for ${key}:`, error);
    return null;
  }
}
