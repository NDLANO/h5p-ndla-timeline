import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "../App";
import { LocalizationContext } from "../contexts/LocalizationContext";
import { Params } from "../types/H5P/Params";
import { Translations } from "../types/Translations";
import { H5P } from "./H5P.util";

export class H5PWrapper extends H5P.EventDispatcher {
  private wrapper: HTMLElement;

  constructor(params: Params, contentId: string, extras?: unknown) {
    super();
    this.wrapper = H5PWrapper.createWrapperElement();

    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const l10n = params.l10n ?? ({} as Translations);

    ReactDOM.render(
      <LocalizationContext.Provider value={l10n}>
        <App adjective="beautiful" />
      </LocalizationContext.Provider>,
      this.wrapper,
    );
  }

  attach($container: JQuery<HTMLElement>): void {
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error("Found no containing element to attach `h5p-timeline` to.");
      return;
    }

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-timeline");
  }

  private static createWrapperElement(): HTMLDivElement {
    return document.createElement("div");
  }
}
