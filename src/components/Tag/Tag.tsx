import * as React from 'react';
import { FC } from 'react';
import fontColorContrast from 'font-color-contrast';
import { Tag as TagType } from '../../types/Tag';
import styles from './Tag.module.scss';

type TagProps = {
  tag: TagType;
};

export const Tag: FC<TagProps> = ({ tag }) => {
  const { name, color: backgroundColor } = tag;
  const textColor = fontColorContrast(backgroundColor);

  return (
    // role="listitem" is added because the element's `display` property
    // changes the role.
    <li
      role="listitem"
      className={styles.tag}
      style={{ backgroundColor, color: textColor }}
    >
      {name}
    </li>
  );
};
