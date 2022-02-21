/* eslint-disable max-classes-per-file */
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

declare module "*.module.css";
declare module "*.module.scss";

declare module "@knight-lab/timelinejs" {
  declare type TimelineMedia = {
    url: string;
    caption?: string;
    credit?: string;
    thumbnail?: string;
    alt?: string;
    title?: string;
    link?: string;
    link_target?: string;
  };

  declare type TimelineText = {
    text: string;
    headline?: string;
  };

  declare type TimelineDate = {
    year: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
  };

  declare type TimelineEra = {
    start_date: TimelineDate;
    end_date: TimelineDate;
    text?: TimelineText;
  };

  declare type TimelineSlide = {
    start_date: TimelineDate;
    end_date?: TimelineDate;
    text?: TimelineText;
    media?: TimelineMedia;

    /**
     * If present, Timeline will organize events with the same
     * value for group to be in the same row or adjacent rows,
     * separate from events in other groups. The common value
     * for the group will be shown as a label at the left edge
     * of the navigation.
     */
    group?: string;
    display_date?: string;
    background?: { url?: string; color?: string };
    autolink?: boolean;
    unique_id?: string;
  };

  /*
   * path to json/ or link to googlespreadsheet
   * source Should be either the path to the JSON resource to load, or a JavaScript object corresponding to the
   * Timeline model.
   *
   * Here is an example using a data object:
   *
   * var dataObject = {timeline: {headline: "Headline", type: ... }}
   * createStoryJS({
   * type:       'timeline',
   * width:      '800',
   * height:     '600',
   * source:     dataObject,
   * embed_id:   'my-timeline'
   * });
   * If source is a string, we will try to automatically recognize resources that are Twitter searches, Google
   * Spreadsheets or Storify stories. Failing that, we assume the source is either JSON or JSONP. If string
   * matches on .jsonp, we will treat it as JSONP, otherwise, we will append ?callback=onJSONP_Data.
   */
  declare type TimelineDefinition =
    | string
    | {
        title?: Optional<TimelineSlide, "start_date">;
        events: Array<TimelineSlide>;
        eras: Array<TimelineEra>;
        scale?: "human" | "cosmoligical" = "human";
      };

  // Definitions by: Roland Zwaga <https://github.com/rolandzwaga>
  // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/timelinejs/index.d.ts

  declare interface ITimeLineConfiguration {
    width: string;
    height: string;

    source: TimelineDefinition;
    type?: string | undefined;
    /*
     * Optional use a different div id for embed
     */
    embed_id?: string | undefined;
    /*
     * Optional start at latest date
     */
    start_at_end?: boolean | undefined;
    /*
     * Optional start at specific slide
     */
    start_at_slide?: string | undefined;
    /*
     * Optional tweak the default zoom level
     */
    start_zoom_adjust?: string | undefined;
    /*
     * Optional location bar hashes
     */
    hash_bookmark?: boolean | undefined;
    /*
     * Optional font
     */
    font?: string | undefined;
    /*
     * Optional debug to console
     */
    debug?: boolean | undefined;
    /*
     * Optional language
     */
    lang?: string | undefined;
    /*
     * Optional path to css
     */
    css?: string | undefined;
    /*
     * Optional path to js
     */
    js?: string | undefined;
    /*
     * required in order to use maptype
     */
    gmap_key?: string | undefined;
    /*
     * Stamen Maps:
     * toner
     * toner-lines
     * toner-labels
     * watercolor
     * sterrain
     *
     * Google Maps:
     * ROADMAP
     * TERRAIN
     * HYBRID
     * SATELLITE
     *
     * OpenStreetMap:
     * osm
     */
    maptype?: string | undefined;
  }

  declare class Timeline {
    constructor(
      containerId: string,
      timelineDefinition: TimelineDefinition,
      options: ITimeLineConfiguration,
    );
  }
}

declare module "@knight-lab/timelinejs/src/js/media/Media" {
  declare class Media {
    constructor(
      data?: {
        unique_id?: string;
        url?: string;
        credit?: string;
        caption?: string;
        credit_alternate?: string;
        caption_alternate?: string;
        link?: string;
        link_target?: string;
      },
      options?: {
        api_key_flickr?: string;
        api_key_googlemaps?: string;
        api_key_embedly?: string;
        credit_height?: number;
        caption_height?: number;
        background?: number;
      },
      language?: string,
    );

    addTo(container: HTMLElement): void;

    on(eventName: string, callback: (event: unknown) => void);

    off(eventName: string, callback: (event: unknown) => void);
  }

  declare module "@knight-lab/timelinejs/src/js/media/MediaType" {
    declare function lookupMediaType(
      m: { url: string },
      image_only: boolean,
    ): { type: string; name: string; match_str: RegExp; cls: typeof Function };
  }
}
