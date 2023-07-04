import React, { FC, ReactNode } from "react";
import styles from "./Card.module.scss";

interface CardProps {
  isLoading?: boolean;
  loadingColor?: string;
  cardType?: "default" | "horizon";
  widthSize?: "small" | "medium";
  cardPadding?: "default" | "small";
  isShadow?: boolean;
  children: ReactNode;
}

const Card: FC<CardProps> & {
  Title: typeof CardTitle;
  Subtitle: typeof CardSubtitle;
  Body: typeof CardBody;
} = (props) => {
  const classes = [
    styles.card,
    styles[`_cardType__${props.cardType}`],
    styles[`_size__${props.widthSize}`],
    styles[`_cardPadding__${props.cardPadding}`],
    props.isLoading ? styles._isLoading : "",
    props.isShadow ? styles._isShadow : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`${classes}`} role="dialog" aria-labelledby="cardTitle" aria-describedby="cardDescription">
      {props.children}
    </div>
  );
};

const CardTitle: FC<{ children: ReactNode }> = ({ children }) => (
  <div id="cardTitle" className={styles.card_title}>
    {children}
  </div>
);
const CardSubtitle: FC<{ children: ReactNode }> = ({ children }) => (
  <div className={styles.card_subtitle}>{children}</div>
);
const CardBody: FC<{ children: ReactNode }> = ({ children }) => (
  <div id="cardDescription" className={styles.card_body}>
    {children}
  </div>
);

Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
Card.Body = CardBody;

Card.defaultProps = {
  isLoading: false,
  loadingColor: "secondary",
  cardType: "default",
  widthSize: "medium",
  cardPadding: "default",
  isShadow: true,
};

export default Card;
