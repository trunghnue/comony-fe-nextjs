import { useState } from "react";
import { isArray } from "@/utilities";

interface Props {
  className?: string;
  favoriteIcon?: boolean;
  height?: string;
  iconColor?: string;
  iconHoverColor?: string;
  iconName?: string;
  isFavorited?: boolean;
  path?: string | object[];
  path2?: string;
  stroke?: string;
  strokeMiterlimit?: string;
  transform?: string;
  viewBox?: string;
  width?: string;
}

export default function IconBase({
  className = "",
  favoriteIcon = false,
  height = "100",
  iconColor = "#222",
  iconHoverColor = "#222",
  iconName = "box",
  isFavorited = false,
  path = "",
  path2 = "",
  stroke = "",
  strokeMiterlimit = "",
  transform = "",
  viewBox = "0, 0, 100, 100",
  width = "100",
}: Props) {
  const [isHover, setIsHover] = useState(false);

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      aria-labelledby={iconName}
      role="presentation"
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <title id={iconName} lang="en">
        {`${iconName} icon`}
      </title>
      {favoriteIcon ? (
        <template>
          <mask id="path-1-inside-1_1902_36795" fill="white">
            <path fillRule="evenodd" clipRule="evenodd" d={path2} />
          </mask>
          {isFavorited && <path fillRule="evenodd" clipRule="evenodd" d={path2} fill="white" />}
          <path d={isArray(path) ? "" : path} fill="white" mask="url(#path-1-inside-1_1902_36795)" />
        </template>
      ) : (
        <g data-name={iconName} transform={transform} fill={isHover ? iconHoverColor : iconColor}>
          {isArray(path) ? (
            <>
              {path.map((item, index) => {
                return <path key={index} d={item.value} fill={item.fill} fillRule={item.fillRule} clipRule={item.clipRule} />;
              })}
            </>
          ) : (
            <path d={path} transform={transform} stroke={stroke} strokeMiterlimit={strokeMiterlimit} />
          )}
        </g>
      )}
    </svg>
  );
}
