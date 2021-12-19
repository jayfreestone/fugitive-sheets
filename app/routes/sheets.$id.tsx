import { Link, useLoaderData } from 'remix';
import type { LoaderFunction, MetaFunction } from 'remix';
import createSheetMask from '~/blob/createSheetMask.server';
import Sheet from '~/components/Sheet';
import { createBlobFromSeed, createBlobSeed } from '~/blob/createBlob';
import getSheet from '~/prose/getSheet';
import getSheetIDs from '~/prose/getSheetIDs';

interface SheetData {
  id: string;
  title: string;
  copy: string;
  link: string;
  sheetImage: {
    left: string;
    right: string;
    original: string;
  };
  nextSheetId: string;
}

function encodeSeed(blobSeed: string, sheetId: string) {
  const id = [blobSeed, sheetId].join(':');
  const buff = new Buffer(id);
  return buff.toString('base64');
}

function decodeSeed(data: string) {
  const buff = new Buffer(data, 'base64');
  const [blobSeed, sheetId] = buff.toString('ascii').split(':');
  return [blobSeed, sheetId];
}

export const loader: LoaderFunction = async ({ params }) => {
  const seed = params.id;

  if (!seed) {
    throw new Response('Seed not found', { status: 404 });
  }

  const [blobSeed, sheetId] = decodeSeed(seed);

  const svg = createBlobFromSeed(blobSeed);
  const [left, right] = createSheetMask(svg);

  const { attributes, body } = getSheet(sheetId);

  const sheetIDs = getSheetIDs();
  const randomSheetId = sheetIDs[Math.floor(Math.random() * sheetIDs.length)];

  const data: SheetData = {
    id: seed,
    title: attributes.title,
    link: attributes.link,
    copy: body,
    sheetImage: { left, right, original: svg },
    nextSheetId: encodeSeed(createBlobSeed(), randomSheetId),
  };

  return data;
};

export const meta: MetaFunction = ({ data }: { data: SheetData }) => {
  return {
    title: data ? `Sheet #${data.id}` : 'A truly fugitive sheet',
  };
};

export default function SheetPage() {
  const data = useLoaderData<SheetData>();

  return (
    <div className="sheet-observer">
      <div className="sheet_observer__header">
        <h1>{data.title}</h1>
        <a href={data.link} target="_blank" rel="noopener noreferrer">
          Reunite sheet
        </a>
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
      <Link to={`/sheets/${encodeURIComponent(data.nextSheetId)}`}>
        Another
      </Link>
    </div>
  );
}
