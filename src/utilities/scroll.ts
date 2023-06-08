import { useState } from "react";

export function handleScroll() {
  const visibilityChangedArrows = (entry: IntersectionObserverEntry) => {
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
  };

  const maskTxtAnimation = (entry: IntersectionObserverEntry, delay = 0) => {
    setTimeout(() => {
      entry.target.classList.add("show-mask");
    }, delay);
  };

  const handleScaleImage = (id: string, styles: any) => {
    const image = document.querySelector(`#${id}`);
    image?.classList.add(styles.imageBox_wrapper_animated);
  };

  // --------- ImageBox content animation ----------
  const visibilityChangedImageBoxContent = (entry: IntersectionObserverEntry, styles: any) => {
    const elm = entry.target || document;
    if (elm?.classList.contains(styles.slideItems)) {
      elm.classList.add(styles.__animated);
    }
  };

  const slideItems = (isVisible: boolean, entry: IntersectionObserverEntry, time = 220, classes = "is-active") => {
    if (isVisible) {
      const elm = entry.target;
      const items = elm.querySelectorAll(".slide-in-item");

      items.forEach((item, index) => {
        const order = index + 1;
        const delay = order * time;

        setTimeout(() => {
          item.classList.add(classes);
        }, delay);
      });
    }
  };

  return { visibilityChangedArrows, maskTxtAnimation, handleScaleImage, visibilityChangedImageBoxContent, slideItems };
}
