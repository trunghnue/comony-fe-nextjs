import { useState } from "react";

export const useVirtualScroll = () => {
  const [isInViewPort, setIsInViewport] = useState<boolean>(false);
  const visibilityChanged = (isVisible: boolean) => {
    if (isVisible) {
      setIsInViewport(true);
    } else {
      setIsInViewport(false);
    }
  };

  return { isInViewPort, visibilityChanged };
};
