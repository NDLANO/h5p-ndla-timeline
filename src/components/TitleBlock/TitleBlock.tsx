import * as React from 'react';
import { FC } from 'react';
import * as styles from './TitleBlock.module.scss';

type TitleBlockProps = {
  title: string;
};

export const TitleBlock: FC<TitleBlockProps> = ({ title }) => {
  return <div className={styles.title}>{title}</div>;
};
