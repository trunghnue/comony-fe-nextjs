import React from "react";
import CircleImage from "@/components/atoms/Image/CircleImage";
import SquareImage from "@/components/atoms/Image/SquareImage";
import styles from "./UserAvatar.module.scss";
import { truncateFilter } from "@/utilities/filters/truncate";

interface UserAvatarProps {
  size: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge";
  imagePath: string;
  direction: "vertical" | "horizontal";
  userName: string;
  userEmail?: string;
  expand: boolean;
  bgColor: "black" | "white";
  truncateLength?: string;
  imageType: "square" | "circle";
}

const UserAvatar: React.FC<UserAvatarProps> = (props) => {
  const { size, imagePath, direction, userName, userEmail, expand, bgColor, truncateLength } = props;

  const truncateText = truncateFilter();

  const avatarSize = React.useMemo(() => {
    switch (size) {
      case "xxsmall":
        return 20;
      case "xsmall":
        return 27;
      case "small":
        return 44;
      case "medium":
        return 55;
      case "large":
        return 115;
      case "xlarge":
      default:
        return 135;
    }
  }, [size]);

  const classes = React.useMemo(() => {
    return [
      styles.userAvatar,
      styles[`-direction--${direction}`],
      styles[`-size--${size}`],
      styles[`-bgColor--${bgColor}`],
      expand ? styles["--expand"] : "",
    ].join(" ");
  }, [direction, size, bgColor, expand]);

  return (
    <div className={classes}>
      {props.imageType === "circle" ? (
        <CircleImage size={avatarSize} type="image" path={imagePath} alt={userName} />
      ) : (
        <SquareImage
          className={styles.userAvatar_image}
          width={avatarSize}
          height={avatarSize}
          // borderColor="none"
          path={imagePath}
          alt={userName}
        />
      )}

      {userName && (
        <div className={styles.userAvatar_name}>
          {truncateLength ? <span>{truncateText(userName, truncateLength, "..")}</span> : <span>{userName}</span>}

          {userEmail && <span className={styles.userAvatar_email}>{userEmail}</span>}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
