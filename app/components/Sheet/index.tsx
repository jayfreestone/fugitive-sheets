import React from 'react';
import encodeSVG from '~/blob/encodeSVG';

interface Props {
  left: string;
  right: string;
  original: string;
  copy: string;
}

function Sheet({ left, right, original, copy }: Props): React.ReactElement {
  return (
    <div className="sheet">
      <div className="sheet__inner">
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
        <code className="sheet__copy">{copy}</code>
      </div>
      <span
        className="sheet__ghost"
        dangerouslySetInnerHTML={{ __html: original }}
      />
    </div>
  );
}

export default Sheet;
