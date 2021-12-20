import type { LoaderFunction, MetaFunction } from 'remix';
import createSheetMask from '~/blob/createSheetMask.server';
import { createBlobFromSeed } from '~/blob/createBlob';
import getSheet from '~/prose/getSheet';
import { decodeSeed } from '~/seed/encoding';
import SheetPage, { SheetData } from '~/components/SheetPage';
import createSeed from '~/seed/createSeed';

function createNotFound() {
  throw new Response('Seed not found', { status: 404 });
}

export function headers() {
  return {
    'Cache-Control': 'max-age=0, s-maxage=86400',
  };
}

export const loader: LoaderFunction = async ({ params }) => {
  const seed = params.id;

  if (!seed) {
    throw createNotFound();
  }

  try {
    const [blobSeed, sheetId] = decodeSeed(seed);

    const svg = createBlobFromSeed(blobSeed);
    const [left, right] = createSheetMask(svg);

    const { attributes, body } = getSheet(sheetId);

    const data: SheetData = {
      id: seed,
      title: attributes.title,
      link: attributes.link,
      copy: body,
      sheetImage: { left, right, original: svg },
      nextSheetId: createSeed(),
    };

    return data;
  } catch (e) {
    // Prefer to display a 404 if any part of it failed,
    // rather than an error indicating a missing file etc.
    throw createNotFound();
  }
};

export const meta: MetaFunction = ({ data }: { data: SheetData }) => {
  const title = data
    ? `Sheet #${data.id} | Fugitive Sheets`
    : 'A truly fugitive sheet';

  return {
    title,
    'og:title': title,
  };
};

export default SheetPage;
