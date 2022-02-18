import { Media as KnightLabMedia } from "@knight-lab/timelinejs/src/js/media/Media";
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
    containerElement.addEventListener("media_loaded", () => {
      console.log("media_loaded")
      resolve();
    });


    const mediaBlock = new KnightLabMedia({
      // @ts-expect-error Sophisticated destructuring will work in TypeScript 4.6
      url: type === "custom" ? media : media.path,
    });
    console.log({mediaBlock})

    mediaBlock.on("media_loaded", () => {
      console.log("on media_loaded")
      resolve();
    });
    
    mediaBlock.on("added", () => {
      console.log("on added")
      resolve();
    });

    mediaBlock.on("loaded", () => {
      console.log("on loaded");
    })

    mediaBlock.addTo(containerElement);

    // Resolve after five seconds if `media_loaded` is never triggered
    setTimeout(() => {
      mediaBlock.onLoaded();
    }, 5000);
  });
};
