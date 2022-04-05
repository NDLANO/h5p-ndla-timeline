import { H5PExtras } from "h5p-types";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "../App";
import { H5PContainerContext } from "../contexts/H5PContainerContext";
import { LocalizationContext } from "../contexts/LocalizationContext";
import { Params } from "../types/Params";
import { Translations } from "../types/Translations";
import { H5P, updatePaths } from "./H5P.util";

export class H5PWrapper extends H5P.EventDispatcher {
  private wrapper: HTMLElement;

  private params: Params;

  private extras: H5PExtras;

  constructor(params: Params, contentId: string, extras: H5PExtras) {
    super();
    this.wrapper = H5PWrapper.createWrapperElement();

    updatePaths(params, contentId);

    this.params = params;
    this.extras = extras;
  }

  attach($container: JQuery<HTMLDivElement>): void {
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error("Found no containing element to attach `h5p-timeline` to.");
      return;
    }

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-timeline");

    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const l10n = this.params.l10n ?? ({} as Translations);
    const { title } = this.extras.metadata;

    ReactDOM.render(
      <H5PContainerContext.Provider value={containerElement}>
        <LocalizationContext.Provider value={l10n}>
          {this.params ? <App title={title} params={this.params} /> : null}
        </LocalizationContext.Provider>
      </H5PContainerContext.Provider>,
      this.wrapper,
    );
  }

  private static createWrapperElement(): HTMLDivElement {
    return document.createElement("div");
  }
}
