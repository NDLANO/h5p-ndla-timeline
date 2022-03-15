/* eslint-disable @typescript-eslint/no-explicit-any */
import { H5PObject } from "../../H5P";
import { Params } from "../types/H5P/Params";

export const H5P: H5PObject = (window as any).H5P ?? {};

export const normalizeAssetPath = (path: string, contentId: string): string => {
  const pathAlreadyAbsolute =
    path.startsWith("http://") || path.startsWith("https://");

  if (pathAlreadyAbsolute) {
    return path;
  }
  return H5P.getPath(path, contentId);
};

export function updatePaths(params: Params, contentId: string): void {
  params.timelineItems?.forEach(item => {
    if (item.mediaType === "image" && item.image) {
      // Item has uploaded image

      // eslint-disable-next-line no-param-reassign
      item.image.path = normalizeAssetPath(item.image.path, contentId);
    }

    if (item.mediaType === "video" && item.video != null) {
      // Item has uploaded video

      // eslint-disable-next-line no-param-reassign
      item.video.path = normalizeAssetPath(item.video.path, contentId);
    }
  });
}
