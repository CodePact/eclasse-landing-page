import { readFile } from "node:fs/promises";
import { join } from "node:path";

const assetPattern = /^[a-z0-9.-]+$/i;

export async function GET(_request, { params }) {
  const { asset } = await params;
  if (
    asset !== "favicon.ico" &&
    (!assetPattern.test(asset) ||
      asset.includes("..") ||
      !/\.(?:svg|woff2)$/i.test(asset))
  ) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const path =
      asset === "favicon.ico"
        ? join(process.cwd(), "favicon.ico")
        : join(process.cwd(), "_next", "static", "media", asset);
    const body = await readFile(path);
    const contentType = asset.endsWith(".svg")
      ? "image/svg+xml"
      : asset.endsWith(".woff2")
        ? "font/woff2"
        : "image/x-icon";

    return new Response(body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
