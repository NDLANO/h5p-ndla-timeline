import { Root, Trigger, Content, Close, Arrow } from '@radix-ui/react-popover';
import * as React from 'react';
import { FC, ReactElement } from 'react';
import * as styles from './Popover.module.scss';

type Params = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  children?: ReactElement | Array<ReactElement>;
  triggerProps?: Record<string, unknown>;
};

export const Popover: FC<Params> = ({
  children,
  isOpen,
  onOpenChange,
  triggerProps,
}) => {
  return (
    <Root open={isOpen} onOpenChange={onOpenChange}>
      <Trigger className={styles.trigger} {...triggerProps} />
      <Content className={styles.content}>
        <Close className={styles.close} />
        <Arrow className={styles.arrow} />
        {children}
      </Content>
    </Root>
  );
};
