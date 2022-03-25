/* eslint-disable @typescript-eslint/no-explicit-any */
import { H5PObject } from "../../H5P";
import { EventItemType } from "../types/EventItemType";
import { Params } from "../types/Params";
import { SlideType } from "../types/SlideType";

export const H5P: H5PObject = (window as any).H5P ?? {};

export const normalizeAssetPath = (path: string, contentId: string): string => {
  const pathAlreadyAbsolute =
    path.startsWith("http://") || path.startsWith("https://");

  if (pathAlreadyAbsolute) {
    return path;
  }

  return H5P.getPath(path, contentId);
};

function updateEventPaths(
  item: EventItemType<SlideType>,
  contentId: string,
): void {
  if (item.mediaType === "image" && item.image) {
    // Item has uploaded image

    // eslint-disable-next-line no-param-reassign
    item.image.path = normalizeAssetPath(item.image.path, contentId);
  } else if (
    item.mediaType === "video" &&
    item.video != null &&
    item.video.length > 0
  ) {
    // Item has uploaded video

    item.video.forEach(video => {
      // eslint-disable-next-line no-param-reassign
      video.path = normalizeAssetPath(video.path, contentId);
    });
  }

  if (
    item.appearance.backgroundType === "image" &&
    item.appearance.backgroundImage != null
  ) {
    // eslint-disable-next-line no-param-reassign
    item.appearance.backgroundImage.path = normalizeAssetPath(
      item.appearance.backgroundImage.path,
      contentId,
    );
  }
}

export function updatePaths(params: Params, contentId: string): void {
  if (params.titleSlide) {
    updateEventPaths(params.titleSlide, contentId);
  }

  params.timelineItems?.forEach(item => updateEventPaths(item, contentId));
}
