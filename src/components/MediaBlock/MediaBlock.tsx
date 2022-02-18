import { Media as KnightLabMedia } from "@knight-lab/timelinejs/src/js/media/Media";
import * as React from "react";
import { FC, useEffect, useMemo, useRef } from "react";
import { Media as H5PMedia } from "../../types/H5P/Media";

type MediaBlockProps =
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
    };

export const MediaBlock: FC<MediaBlockProps> = ({ type, media }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useMemo<KnightLabMedia>(
    () =>
      new KnightLabMedia({
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
