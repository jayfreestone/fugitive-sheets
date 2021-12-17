import React from "react";
import encodeSVG from "~/blob/encodeSVG";

interface Props {
  left: string;
  right: string;
  copy: string;
}

function Sheet({ left, right, copy }: Props): React.ReactElement {
  return (
    <div className="sheet">
      <span
        className="sheet__image sheet__image--left"
        style={{ shapeOutside: encodeSVG(left) }}
        dangerouslySetInnerHTML={{ __html: left }}
      />
      <span
        className="sheet__image sheet__image--right"
        style={{ shapeOutside: encodeSVG(right) }}
        dangerouslySetInnerHTML={{ __html: right }}
      />
      <code className="sheet__copy">
        {copy}
      </code>
    </div>
  );
}

export default Sheet;
