import { Copyright } from "h5p-types";
import * as React from "react";
import { FC, useState } from "react";
import { CopyrightPopover } from "../CopyrightPopover/CopyrightPopover";

type Params = { copyright: Copyright };

export const CopyrightInformation: FC<Params> = ({ copyright }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="h5p-tl-copyright-information"
      data-copyright={JSON.stringify(copyright)}
    >
      <CopyrightPopover
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        copyright={copyright}
      />
    </div>
  );
};
