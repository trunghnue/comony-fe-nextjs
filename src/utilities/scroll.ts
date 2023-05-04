import { useState } from "react";

export function handleScroll() {
  const visibilityChangedArrows = (isVisible: boolean, entry: IntersectionObserverEntry) => {
    if (isVisible) {
      const elm = entry.target || document;
      const itemsClass = elm.classList;
      if (!itemsClass) {
        return;
      }
      if (itemsClass.contains("-right") && !itemsClass.contains("-right--animated")) {
        elm.classList.add("-right--animated");
      } else if (itemsClass.contains("-left") && !itemsClass.contains("-left--animated")) {
        elm.classList.add("-left--animated");
      } else if (itemsClass.contains("-bottomToTop") && !itemsClass.contains("-bottomToTop--animated")) {
        elm.classList.add("-bottomToTop--animated");
      }
    }
  };

  const maskTxtAnimation = (isVisible: boolean, entry: IntersectionObserverEntry, delay = 0) => {
    if (isVisible) {
      setTimeout(() => {
        entry.target.classList.add("show-mask");
      }, delay);
    }
  };

  const handleScaleImage = (isVisible: boolean, id: string, styles: any) => {
    if (isVisible) {
      const image = document.querySelector(`#${id}`);
      image?.classList.add(styles.imageBox_wrapper_animated);
    }
  };

  return { visibilityChangedArrows, maskTxtAnimation, handleScaleImage };
}
