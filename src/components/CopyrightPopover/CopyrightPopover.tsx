import { H5PCopyright } from 'h5p-types';
import * as React from 'react';
import { FC, useState } from 'react';
import { useEffectOnce } from 'react-use';
import { useL10n } from '../../hooks/useLocalization';
import { Popover } from '../Popover/Popover';
import styles from './CopyrightPopover.module.scss';

type Params = {
  copyright: H5PCopyright;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export const CopyrightPopover: FC<Params> = ({
  copyright,
  isOpen,
  onOpenChange,
}) => {
  const [isClient, setIsClient] = useState(false);

  const { title, author, source, year, license, version } = copyright;

  const copyrightLabel = useL10n('copyrightLabel');
  const titleLabel = useL10n('copyrightTitle');
  const authorLabel = useL10n('copyrightAuthor');
  const sourceLabel = useL10n('copyrightSource');
  const yearLabel = useL10n('copyrightYear');
  const licenseLabel = useL10n('copyrightLicense');
  const versionLabel = useL10n('copyrightVersion');

  const isUrl = source?.startsWith('http://') || source?.startsWith('https://');

  useEffectOnce(() => {
    setIsClient(true);
  });

  return isClient ? (
    <Popover
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      triggerProps={{
        children: (
          <span
            className={`${styles.trigger} h5p-tl-copyright-popover-trigger`}
          >
            {copyrightLabel}
          </span>
        ),
        'aria-label': copyrightLabel,
      }}
    >
      <div className={styles.content}>
        {title && (
          <div className={styles.row}>
            <span className={styles.label}>{titleLabel}</span>
            <span>{title}</span>
          </div>
        )}

        {author && (
          <div className={styles.row}>
            <span className={styles.label}>{authorLabel}</span>
            <span>{author}</span>
          </div>
        )}

        {source && (
          <div className={styles.row}>
            <span className={styles.label}>{sourceLabel}</span>
            {isUrl ? <a href={source}>{source}</a> : <span>{source}</span>}
          </div>
        )}

        {year && (
          <div className={styles.row}>
            <span className={styles.label}>{yearLabel}</span>
            <span>{year}</span>
          </div>
        )}

        {license && (
          <div className={styles.row}>
            <span className={styles.label}>{licenseLabel}</span>
            <span>{license}</span>
          </div>
        )}

        {version && (
          <div className={styles.row}>
            <span className={styles.label}>{versionLabel}</span>
            <span>{version}</span>
          </div>
        )}
      </div>
    </Popover>
  ) : null;
};
