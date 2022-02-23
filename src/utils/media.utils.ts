import { lookupMediaType } from "@knight-lab/timelinejs/src/js/media/MediaType";
import { Media as H5PMedia } from "../types/H5P/Media";

type MediaBlockProps = {
  containerElement: HTMLElement;
} & (
  | {
      type: "image";
      media: H5PMedia | string;
    }
  | {
      type: "video";
      media: H5PMedia;
    }
  | {
      type: "custom";
      media: string;
    }
);

export const renderMediaBlock = ({
  type,
  media,
  containerElement,
}: MediaBlockProps): Promise<void> => {
  return new Promise<void>(resolve => {
    const timelineMedia = {
      // @ts-expect-error Sophisticated destructuring will work in TypeScript 4.6
      url: type === "custom" ? media : media.path,
    };

    const mediatype = lookupMediaType(timelineMedia);
    const MediaClass = mediatype.cls;

    const options = {};

    const mediaBlock = new MediaClass({ ...timelineMedia, mediatype }, options);

    containerElement.addEventListener("media_loaded", () => {
      console.log("container element media_loaded");
      resolve();
    });

    mediaBlock.on("media_loaded", () => {
      resolve();
    });

    mediaBlock.on("loaded", () => {
      resolve();
    });

    mediaBlock.addTo(containerElement);
    mediaBlock.loadMedia();

    // Resolve after five seconds if `media_loaded` is never triggered
    setTimeout(() => {
      resolve();
    }, 5000);
  });
};
