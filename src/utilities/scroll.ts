export function handleScroll() {
  const visibilityChangedArrows = (isVisible: boolean, entry: IntersectionObserverEntry) => {
    if (isVisible) {
      const elm = entry.target || document;
      elm?.classList.add("-bottomToTop--animated");
    }
  };

  return { visibilityChangedArrows };
}
