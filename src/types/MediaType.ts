import { Audio, Image, Video } from "h5p-types";

export type MediaType =
  | {
      mediaType: "image";
      image?: Image;
    }
  | {
      mediaType: "video";
      video?: Array<Video>;
    }
  | {
      mediaType: "audio";
      audio?: Array<Audio>;
    }
  | {
      mediaType: "custom";
      customMedia?: string;
    }
  | {
      mediaType: "none";
    };
