import { H5PCopyright } from 'h5p-types';
import * as React from 'react';
import { FC, useState } from 'react';
import { CopyrightPopover } from '../CopyrightPopover/CopyrightPopover';

type Params = { copyright: H5PCopyright };

export const CopyrightInformation: FC<Params> = ({ copyright }) => {
  const [isOpen, setIsOpen] = useState(false);

  const encodedCopyright: H5PCopyright = {
    ...copyright,
  };

  if (encodedCopyright.source) {
    // TimelineJS will replace any url with a `<a href="{link}">{link}</a>`.
    // We don't want that to happen with our serialized copyright.
    encodedCopyright.source = encodedCopyright.source.replace(
      'http',
      'h_t_t_p',
    );
  }

  const serializedCopyright = JSON.stringify(encodedCopyright);

  return (
    <div
      className="h5p-tl-copyright-information"
      data-copyright={serializedCopyright}
    >
      <CopyrightPopover
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        copyright={copyright}
      />
    </div>
  );
};
