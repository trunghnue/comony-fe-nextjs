import { useMemo } from "react";
import { icons } from "@/constants/icons";
import IconBase from "../IconBase/IconBase";
import styles from "./AppLogo.module.scss";

interface Props {
  className?: string;
  size?: string;
  iconColor?: string;
  direction?: string;
}

export default function AppLogo({ size = "medium", direction = "horizontal", iconColor = "#222", className = "" }: Props) {
  const classes = useMemo(() => {
    return [className, styles[`_size__${size}`], styles[`_direction__${direction}`], styles[`_iconColor__${iconColor}`]].filter(Boolean).join(" ");
  }, [className, size, direction, iconColor]);

  const markSize = useMemo((): string => {
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
  }, [size]);

  const nameWidth = useMemo(() => {
    if (size === "xsmall") {
      return "49.25";
    }
    if (size === "small") {
      return "95";
    }
    if (size === "medium") {
      return "147.25";
    }
    return "197";
  }, [size]);

  const nameHeight = useMemo(() => {
    if (size === "xsmall") {
      return "12.5";
    }
    if (size === "small") {
      return "24";
    }
    if (size === "medium") {
      return "37.5";
    }
    return "31";
  }, [size]);

  return (
    <div className={`${styles.appLogo} ${classes}`}>
      <IconBase
        className={styles.appLogo_mark}
        iconName="logo"
        width={markSize}
        height={markSize}
        path={icons.logo.path}
        viewBox={icons.logo.viewBox}
        transform={icons.logo.transform}
        iconColor={iconColor}
        iconHoverColor={iconColor}
      />
      <IconBase
        className={styles.appLogo_name}
        iconName="comony"
        width={nameWidth}
        height={nameHeight}
        path={icons.comony.path}
        viewBox={icons.comony.viewBox}
        transform={icons.comony.transform}
        iconColor={iconColor}
        iconHoverColor={iconColor}
      />
    </div>
  );
}
