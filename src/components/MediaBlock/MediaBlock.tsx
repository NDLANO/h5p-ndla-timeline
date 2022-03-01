/* eslint-disable react/destructuring-assignment */
import { Media } from "@knight-lab/timelinejs/src/js/media/Media";
import * as React from "react";
import { FC, useEffect, useMemo, useRef } from "react";
import { Image } from "../../types/H5P/Image";
import { Video } from "../../types/H5P/Video";

type MediaBlockProps =
  | {
      type: "image";
      media: Image;
    }
  | {
      type: "video";
      media: Video;
    }
  | {
      type: "custom";
      media: string;
    };

export const MediaBlock: FC<MediaBlockProps> = props => {
  const { media } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useMemo<Media>(
    () =>
      new Media({
        url: props.type === "custom" ? props.media : props.media.path,
      }),
    [props.media, props.type],
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
