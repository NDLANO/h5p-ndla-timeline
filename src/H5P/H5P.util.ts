/* eslint-disable @typescript-eslint/no-explicit-any */
import { H5PObject } from "../../H5P";

export const H5P: H5PObject = (window as any).H5P ?? {};

export const normalizeAssetPath = (path: string, contentId: string): string => {
  const pathAlreadyAbsolute =
    path.startsWith("http://") || path.startsWith("https://");

  if (pathAlreadyAbsolute) {
    return path;
  }
  return H5P.getPath(path, contentId);
};
