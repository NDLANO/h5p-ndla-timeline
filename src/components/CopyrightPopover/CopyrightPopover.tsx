import { Copyright } from "h5p-types";
import * as React from "react";
import { FC } from "react";
import { useL10n } from "../../hooks/useLocalization";
import { CopyrightIcon } from "../CopyrightIcon/CopyrightIcon";
import { Popover } from "../Popover/Popover";
import styles from "./CopyrightPopover.module.scss";

type Params = {
  copyright: Copyright;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export const CopyrightPopover: FC<Params> = ({
  copyright,
  isOpen,
  onOpenChange,
}) => {
  const { title, author, source, year, license, version } = copyright;

  const copyrightLabel = useL10n("copyright");

  const titleLabel = useL10n("copyrightTitle");
  const authorLabel = useL10n("copyrightAuthor");
  const sourceLabel = useL10n("copyrightSource");
  const yearLabel = useL10n("copyrightYear");
  const licenseLabel = useL10n("copyrightLicense");
  const versionLabel = useL10n("copyrightVersion");

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      triggerProps={{
        children: <CopyrightIcon />,
        "aria-label": copyrightLabel,
      }}
    >
      <div className={styles.content}>
        {title && (
          <div className={styles.row}>
            <span>{titleLabel}</span>
            <span>{title}</span>
          </div>
        )}

        {author && (
          <div className={styles.row}>
            <span>{authorLabel}</span>
            <span>{author}</span>
          </div>
        )}

        {source && (
          <div className={styles.row}>
            <span>{sourceLabel}</span>
            <span>{source}</span>
          </div>
        )}

        {year && (
          <div className={styles.row}>
            <span>{yearLabel}</span>
            <span>{year}</span>
          </div>
        )}

        {license && (
          <div className={styles.row}>
            <span>{licenseLabel}</span>
            <span>{license}</span>
          </div>
        )}

        {version && (
          <div className={styles.row}>
            <span>{versionLabel}</span>
            <span>{version}</span>
          </div>
        )}
      </div>
    </Popover>
  );
};
