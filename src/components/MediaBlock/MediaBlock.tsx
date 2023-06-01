import { Media } from '@knight-lab/timelinejs/src/js/media/Media';
import { H5PAudio, H5PImage, H5PVideo } from 'h5p-types';
import * as React from 'react';
import { FC, useEffect, useMemo, useRef } from 'react';

type MediaBlockProps =
  | {
      type: 'image';
      media: H5PImage;
    }
  | {
      type: 'video';
      media: H5PVideo;
    }
  | {
      type: 'audio';
      media: H5PAudio;
    }
  | {
      type: 'custom';
      media: string;
    };

export const MediaBlock: FC<MediaBlockProps> = (props) => {
  const { media } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useMemo<Media>(
    () =>
      new Media({
        url: props.type === 'custom' ? props.media : props.media.path,
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
