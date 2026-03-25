import * as React from 'react';
import { FC } from 'react';
import { Tag as TagType } from '../../types/Tag';
import './Tag.scss';

type TagProps = {
  tag: TagType;
};

export const Tag: FC<TagProps> = ({ tag }) => {
  const { name, color: backgroundColor } = tag;

  return (
    // role="listitem" is added because the element's `display` property
    // changes the role.
    <li
      role="listitem"
      className="tag"
      style={
        {
          '--background-color': backgroundColor,
          'backgroundColor': 'var(--background-color)',
          'color': 'oklab(from var(--background-color) calc(max(0, min((0.5 - l) * 100, 1))) a b);'
        } as React.CSSProperties
      }
    >
      {name}
    </li>
  );
};
