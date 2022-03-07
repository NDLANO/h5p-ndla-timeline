import { Image } from "./H5P/Image";
import { Video } from "./H5P/Video";

export type MediaType =
  | {
      mediaType: "image";
      image?: Image;
    }
  | {
      mediaType: "video";
      video?: Video;
    }
  | {
      mediaType: "custom";
      customMedia?: string;
    }
  | {
      mediaType: "none";
    };
