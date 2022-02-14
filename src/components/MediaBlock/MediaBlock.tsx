/* eslint-disable react/destructuring-assignment */
import * as React from "react";
import { FC } from "react";
import { Image } from "../../types/H5P/Image";
import { Video } from "../../types/H5P/Video";

type MediaBlockProps =
  | {
      type: "video";
      media?: Video;
    }
  | {
      type: "image";
      media?: Image;
    };

export const MediaBlock: FC<MediaBlockProps> = props => {
  if (!props.media) {
    return null;
  }

  switch (props.type) {
    case "video":
      // H5P.Video don't provide any captions
      // eslint-disable-next-line jsx-a11y/media-has-caption
      return <video src={props.media.path} controls />;
    case "image":
      return <img src={props.media.path} alt={props.media.alt} />;
  }
};
