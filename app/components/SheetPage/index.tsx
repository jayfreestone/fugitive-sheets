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

  return (
    <div
      className={cn(
        'sheet-observer',
        showLoader && 'sheet-observer--is-loading'
      )}
    >
      <div className="sheet-observer__header">
        <h2>{data.title}</h2>
        <div className="sheet-observer__links">
          {Boolean(data.link) && (
            <span className="sheet-observer__link">
              <a href={data.link} target="_blank" rel="noopener noreferrer">
                Source
              </a>
            </span>
          )}
          <span className="sheet-observer__link">
            <a
              href={`/sheets/${encodeURIComponent(data.id)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Permalink
            </a>
          </span>
        </div>
      </div>
      <div className="sheet-observer__frame">
        <div className="sheet-observer__sheet">
          <Sheet
            left={data.sheetImage.left}
            right={data.sheetImage.right}
            original={data.sheetImage.original}
            copy={data.copy}
          />
        </div>
      </div>
      <div className="sheet-observer__footer">
        <Link to={`/sheets/${encodeURIComponent(data.nextSheetId)}`}>
          <RefreshIcon className="icon" />
          Next sheet
        </Link>
      </div>
    </div>
  );
}

export default SheetPage;
