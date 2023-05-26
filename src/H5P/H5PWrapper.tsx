import { H5PExtras, H5PContentId, H5PEvent, EventDispatcher } from 'h5p-types';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from '../App';
import { H5PContainerContext } from '../contexts/H5PContainerContext';
import { LocalizationContext } from '../contexts/LocalizationContext';
import { Params } from '../types/Params';
import { Translations } from '../types/Translations';
import { H5P, updatePaths } from './H5P.util';

export class H5PWrapper extends H5P.EventDispatcher {
  private wrapper: HTMLElement;

  private params: Params;

  private contentId: H5PContentId;

  private extras: H5PExtras;

  constructor(params: Params, contentId: string, extras: H5PExtras) {
    super();
    this.wrapper = H5PWrapper.createWrapperElement();

    updatePaths(params, contentId);

    this.params = params;
    this.contentId = contentId;
    this.extras = extras;
  }

  attach($container: JQuery<HTMLDivElement>): void {
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error('Found no containing element to attach `h5p-timeline` to.');
      return;
    }

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add('h5p-timeline');

    const l10n = this.params.l10n ?? ({} as Translations);
    const { title } = this.extras.metadata;

    ReactDOM.render(
      <H5PContainerContext.Provider value={containerElement}>
        <LocalizationContext.Provider value={l10n}>
          {this.params ? (
            <App
              title={title}
              params={this.params}
              contentId={this.contentId}
              onMediaInstanceBuilt={(instance: EventDispatcher): void => {
                this.registerInstanceForResize(instance);
              }}
            />
          ) : null}
        </LocalizationContext.Provider>
      </H5PContainerContext.Provider>,
      this.wrapper,
    );
  }

  // Register an H5P media instance for resize exchange with H5P root
  registerInstanceForResize(instance: EventDispatcher): void {
    // Resize instance to fit inside parent and vice versa
    H5PWrapper.bubbleDown(this, 'resize', [instance]);
    H5PWrapper.bubbleUp(instance, 'resize', this);
  }

  // Bubble H5P events from parent to children
  private static bubbleDown(
    origin: EventDispatcher & { bubblingUpwards?: boolean },
    eventName: string,
    targets: Array<EventDispatcher>,
  ): void {
    origin.on(eventName, (event: H5PEvent): void => {
      if (origin.bubblingUpwards) {
        return; // Prevent send event back down.
      }

      for (let i = 0; i < targets.length; i += 1) {
        targets[i].trigger(eventName, event);
      }
    });
  }

  // Bubble H5P events from child to parent
  private static bubbleUp(
    origin: EventDispatcher,
    eventName: string,
    target: EventDispatcher & { bubblingUpwards?: boolean },
  ): void {
    origin.on(eventName, (event: H5PEvent): void => {
      const targetReference = target; // Avoiding parameter mutation

      // Prevent target from sending event back down
      targetReference.bubblingUpwards = true;

      // Trigger event
      target.trigger(eventName, event);

      // Reset
      targetReference.bubblingUpwards = false;
    });
  }

  private static createWrapperElement(): HTMLDivElement {
    return document.createElement('div');
  }
}
