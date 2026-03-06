const EXTENSIONS: Record<number, string> = {
  200: "jpg",
  307: "gif",
  400: "gif",
  404: "jpg",
  501: "png",
  502: "jpg",

};

/** Returns the filename for a status code image, or null if unsupported. */
export function getImageFilename(code: number): string | null {
  const ext = EXTENSIONS[code] ?? "jpeg";
  return `${code}.${ext}`;
}
