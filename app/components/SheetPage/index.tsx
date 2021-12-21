import { Link } from 'remix';
import cn from 'classnames';
import Sheet from '~/components/Sheet';
import RefreshIcon from '~/components/RefreshIcon';
import useTimeoutLoader from '~/hooks/useTimeoutLoader';
import { Transition } from '@remix-run/react/transition';

export interface SheetData {
  id: string;
  title: string;
  copy: string;
  link?: string;
  sheetImage: {
    left: string;
    right: string;
    original: string;
  };
  nextSheetId: string;
}

function SheetPage({
  data,
  transitionState,
}: {
  data: SheetData;
  transitionState: Transition['state'];
}) {
  const showLoader = useTimeoutLoader(transitionState);

  // Ensure there is at least 3000 characters in the copy by duplicating the
  // original string. Not ideal, but better than a totally empty shape.
  const copies = Math.ceil(3000 / data.copy.length);
  const displayCopy = new Array(copies).fill(data.copy).join(' ');

  return (
    <div
      className={cn(
        'sheet-observer',
        showLoader && 'sheet-observer--is-loading'
      )}
    >
      <div className="sheet-observer__header">
        <h2 className="sheet-observer__title">{data.title}</h2>
        <div className="sheet-observer__links">
          {Boolean(data.link) && (
            <span className="sheet-observer__link">
              <a href={data.link}>Source</a>
            </span>
          )}
          <span className="sheet-observer__link">
            <a href={`/sheets/${encodeURIComponent(data.id)}`}>Permalink</a>
          </span>
        </div>
      </div>
      <div className="sheet-observer__frame">
        <div className="sheet-observer__sheet">
          <Sheet
            left={data.sheetImage.left}
            right={data.sheetImage.right}
            original={data.sheetImage.original}
            copy={displayCopy}
          />
        </div>
      </div>
      <div className="sheet-observer__footer">
        <Link to={`/sheets/${encodeURIComponent(data.nextSheetId)}`}>
          <RefreshIcon className="icon icon--push-right" />
          Next sheet
        </Link>
      </div>
    </div>
  );
}

export default SheetPage;
