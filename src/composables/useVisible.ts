import { useState } from "react";

export const useVisible = () => {
  const [visibleChangedCircle, setVisibleChangedCircle] = useState<boolean>(false);
  const visibilityChangedCircle = (isVisible: boolean) => {
    if (isVisible) {
      setVisibleChangedCircle(true);
    }
  };
  return { visibleChangedCircle, visibilityChangedCircle };
};
