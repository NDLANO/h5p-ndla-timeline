import * as React from 'react';
import { FC } from 'react';
import './TextContentBlock.scss';

type TextContentBlockProps = {
  textContent: string;
};

export const TextContentBlock: FC<TextContentBlockProps> = ({
  textContent,
}) => {
  return (
    <div
      className='textContent'
      dangerouslySetInnerHTML={{ __html: textContent }}
    />
  );
};
