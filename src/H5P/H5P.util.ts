import { IH5PContentType, H5PMedia, H5PContentId } from 'h5p-types';
import { H5P } from 'h5p-utils';
import { EventItemType } from '../types/EventItemType';
import { Params } from '../types/Params';
import { SlideType } from '../types/SlideType';
import libraryJSON from '../../library.json';

export const normalizeAssetPath = (path: string, contentId: string): string => {
  const pathAlreadyAbsolute =
    path.startsWith('http://') || path.startsWith('https://');

  if (pathAlreadyAbsolute) {
    return path;
  }

  return H5P.getPath(path, contentId);
};

function updateEventPaths(
  item: EventItemType<SlideType>,
  contentId: string,
): void {
  if (item.mediaType === 'image' && item.image) {
    // Item has uploaded image
    item.image.path = normalizeAssetPath(item.image.path, contentId);
  }
  else if (
    item.mediaType === 'video' &&
    item.video != null &&
    item.video.length > 0
  ) {
    // Item has uploaded video

    item.video.forEach((video) => {
      video.path = normalizeAssetPath(video.path, contentId);
    });
  }
  else if (
    item.mediaType === 'audio' &&
    item.audio != null &&
    item.audio.length > 0
  ) {
    // Item has uploaded audio

    item.audio.forEach((audio) => {
      audio.path = normalizeAssetPath(audio.path, contentId);
    });
  }

  if (
    item.appearance.backgroundType === 'image' &&
    item.appearance.backgroundImage != null
  ) {
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

  params.timelineItems?.forEach((item) => updateEventPaths(item, contentId));
}

/* Retrieve full machine name incl. version number from library dependency */
export function getFullMachineName(machineName: string): string | null {
  if (!libraryJSON?.preloadedDependencies) {
    return null;
  }

  const finding = libraryJSON.preloadedDependencies.find(
    (dependency) => dependency.machineName === machineName,
  );
  if (
    !finding ||
    !finding.machineName ||
    !finding.majorVersion ||
    !finding.minorVersion
  ) {
    return null;
  }

  return `${finding.machineName} ${finding.majorVersion}.${finding.minorVersion}`;
}

/* Build H5P media instance from parameters */
export function buildH5PMediaInstance(
  contentId: H5PContentId,
  media: Array<H5PMedia> | null,
  machineName: string,
): IH5PContentType | null {
  if (media === null) {
    return null;
  }

  if (machineName === 'H5P.Video') {
    return H5P.newRunnable(
      {
        library: getFullMachineName(machineName) || machineName, // Last resort
        params: {
          sources: media,
          visuals: {
            fit: false,
            controls: true,
          },
          playback: {
            autoplay: false,
            loop: false,
          },
        },
      },
      contentId,
    );
  }

  return null;
}
