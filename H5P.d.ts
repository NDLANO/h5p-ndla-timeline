/* eslint-disable @typescript-eslint/no-explicit-any */

import { H5PWrapper } from "./src/H5P/H5PWrapper";

export interface H5PObject {
  EventDispatcher: typeof EventDispatcher;
  TopicMap: typeof H5PWrapper;
  getPath: (path: string, contentId: string) => string;
}

declare class EventDispatcher {
  /**
   * Add new event listener.
   *
   * @throws {TypeError}
   *   listener must be a function
   * @param {string} type
   *   Event type
   * @param {H5P.EventCallback} listener
   *   Event listener
   * @param {Object} [thisArg]
   *   Optionally specify the this value when calling listener.
   */
  on: (type: string, listener: any, thisArg?: any) => void;

  /**
   * Add new event listener that will be fired only once.
   *
   * @throws {TypeError}
   *   listener must be a function
   * @param {string} type
   *   Event type
   * @param {H5P.EventCallback} listener
   *   Event listener
   * @param {Object} thisArg
   *   Optionally specify the this value when calling listener.
   */
  once: (type: string, listener: any, thisArg: any) => void;

  /**
   * Remove event listener.
   * If no listener is specified, all listeners will be removed.
   *
   * @throws {TypeError}
   *   listener must be a function
   * @param {string} type
   *   Event type
   * @param {H5P.EventCallback} listener
   *   Event listener
   */
  off: (type: string, listener: any) => void;

  /**
   * Dispatch event.
   *
   * @param {string|H5P.Event} event
   *   Event object or event type as string
   * @param {*} [eventData]
   *   Custom event data(used when event type as string is used as first
   *   argument).
   * @param {Object} [extras]
   * @param {boolean} [extras.bubbles]
   * @param {boolean} [extras.external]
   */
  trigger: (
    event: string | any,
    eventData?: any,
    extras?: {
      bubbles?: boolean;
      external?: boolean;
    },
  ) => void;
}

declare interface IH5PWrapper {
  attach($wrapper: JQuery<HTMLElement>): void;
}

declare interface IH5PEditorWrapper {
  appendTo($wrapper: JQuery<HTMLElement>): void;
  validate(): boolean;
  remove(): void;
}
