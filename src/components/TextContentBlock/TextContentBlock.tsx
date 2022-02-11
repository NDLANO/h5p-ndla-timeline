import * as React from "react";
import { FC } from "react";
import styles from "./TextContentBlock.module.scss";

type TextContentBlockProps = {
  textContent: string;
};

export const TextContentBlock: FC<TextContentBlockProps> = ({
  textContent,
}) => {
  return (
    <div
      className={styles.textContent}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: textContent }}
    />
  );
};
