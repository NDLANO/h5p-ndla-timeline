import * as React from 'react';
import { FC } from 'react';
import styles from './TextContentBlock.module.scss';

type TextContentBlockProps = {
  textContent: string;
};

export const TextContentBlock: FC<TextContentBlockProps> = ({
  textContent,
}) => {
  return (
    <div
      className={styles.textContent}
      dangerouslySetInnerHTML={{ __html: textContent }}
    />
  );
};
