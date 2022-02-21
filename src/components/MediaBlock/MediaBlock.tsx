import { Media } from "@knight-lab/timelinejs/src/js/media/Media";
import * as React from "react";
import { FC, useEffect, useMemo, useRef } from "react";
import { Image } from "../../types/H5P/Image";
import { Video } from "../../types/H5P/Video";

type MediaBlockProps =
  | {
      type: "image";
      media: Image | string;
    }
  | {
      type: "video";
      media: Video;
    }
  | {
      type: "custom";
      media: string;
    };

export const MediaBlock: FC<MediaBlockProps> = ({ type, media }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useMemo<Media>(
    () =>
      new Media({
        // @ts-expect-error Sophisticated destructuring will work in TypeScript 4.6
        url: type === "custom" ? media : media.path,
      }),
    [media, type],
  );

  useEffect(() => {
    if (!media || !containerRef.current) {
      return;
    }

    mediaRef.addTo(containerRef.current);
  }, [media, mediaRef]);

  if (!media) {
    return null;
  }

  return <div ref={containerRef} />;
};
