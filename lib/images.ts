const EXTENSIONS: Record<number, string> = {
  200: "jpg",
  307: "gif",
  308: "gif",
  400: "gif",
  404: "jpg",
  502: "jpg",
};

const S3_BASE = "https://httpsolarthatholdendoodle.s3.amazonaws.com";

/** Returns an S3 URL for images too large to store in the repo, or null. */
export function getS3ImageUrl(code: number): string | null {
  const S3_IMAGES: Record<number, string> = {
    501: "501.gif",
  };
  const key = S3_IMAGES[code];
  return key ? `${S3_BASE}/${key}` : null;
}

/** Returns the filename for a status code image, or null if unsupported. */
export function getImageFilename(code: number): string | null {
  const ext = EXTENSIONS[code] ?? "jpeg";
  return `${code}.${ext}`;
}
