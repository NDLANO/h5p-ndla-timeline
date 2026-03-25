import * as React from 'react';
import { FC } from 'react';
import './TitleBlock.scss';

type TitleBlockProps = {
  title: string;
};

export const TitleBlock: FC<TitleBlockProps> = ({ title }) => {
  return <div className='title'>{title}</div>;
};
