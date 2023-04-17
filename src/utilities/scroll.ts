export function handleScroll() {
  const visibilityChangedArrows = (isVisible: boolean, entry: IntersectionObserverEntry) => {
    if (isVisible) {
      const elm = entry.target || document;
      const itemsClass = elm.classList;
      if (!itemsClass) {
        return;
      }

      if (itemsClass.contains("-bottomToTop") && !itemsClass.contains("-bottomToTop--animated")) {
        elm?.classList.add("-bottomToTop--animated");
      }
    }
  };

  return { visibilityChangedArrows };
}
