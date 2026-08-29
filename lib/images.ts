import { existsSync } from "node:fs";
import { join } from "node:path";

const IMAGE_EXTENSIONS = [".webp", ".avif", ".png", ".jpg", ".jpeg", ".PNG", ".JPG", ".JPEG"];

/**
 * Art is dropped into /public by hand, so accept whatever extension the file was saved with
 * rather than forcing one. Pass a path under /public WITHOUT an extension.
 *
 * Returns the public path of the first match, or null when nothing is there yet — which lets a
 * page render a composed fallback instead of a broken image.
 */
export function resolveSiteImage(basePath: string) {
  for (const extension of IMAGE_EXTENSIONS) {
    if (existsSync(join(process.cwd(), "public", `${basePath}${extension}`))) {
      return `${basePath}${extension}`;
    }
  }
  return null;
}
