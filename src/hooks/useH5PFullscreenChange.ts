import { useContext, useEffect, useState } from "react";
import { H5PContainerContext } from "../contexts/H5PContainerContext";

export const useH5PFullscreenChange = (
  callback: (isFullscreen: boolean) => void,
): void => {
  const h5pContainer = useContext(H5PContainerContext);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!h5pContainer) {
      return;
    }

    const observer = new MutationObserver(() => {
      const isNowFullscreen = h5pContainer.classList.contains("h5p-fullscreen");

      const fullscreenChanged = isFullscreen !== isNowFullscreen;
      if (fullscreenChanged) {
        setIsFullscreen(isNowFullscreen);
        callback(isNowFullscreen);
      }
    });

    observer.observe(h5pContainer, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, [callback, h5pContainer, isFullscreen]);
};
