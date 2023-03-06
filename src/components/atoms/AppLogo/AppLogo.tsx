import { FC, useMemo } from "react";
import IconBase from "../IconBase/IconBase";
import { icons } from "@/constants/icons";

export default function AppLogo({ size, iconColor, direction }: { size: string; iconColor: string; direction: string }) {
  const markSize = () => {
    if (size === "xsmall") {
      return "12.5";
    }
    if (size === "small") {
      return "24";
    }
    if (size === "medium") {
      return "37.5";
    }
    return "50";
  };
  return (
    <div>
      <h1>App Logo</h1>
      <IconBase
        iconName="logo"
        width={markSize()}
        height={markSize()}
        path={icons.logo.path}
        viewBox={icons.logo.viewBox}
        transform={icons.logo.transform}
        iconColor={iconColor}
        iconHoverColor={iconColor}
      />
    </div>
  );
}
