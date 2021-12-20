import type { MetaFunction, LoaderFunction } from 'remix';
import SheetPage, { SheetData } from '~/components/SheetPage';
import createSeed from '~/seed/createSeed';
import { decodeSeed } from '~/seed/encoding';
import { createBlobFromSeed } from '~/blob/createBlob';
import createSheetMask from '~/blob/createSheetMask.server';
import getSheet from '~/prose/getSheet';

export function headers() {
  return {
    'Cache-Control': 'max-age=0, s-maxage=1, stale-while-revalidate=86400',
  };
}

export const loader: LoaderFunction = () => {
  const seed = createSeed();
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

  return new Response(JSON.stringify(data), {
    headers: {
      'Cache-Control': 'max-age=0, s-maxage=1, stale-while-revalidate=86400',
    },
  });
};

export const meta: MetaFunction = () => {
  return {
    title: 'Fugitive Sheets',
    description:
      'Anatomical “fugitive sheets” are are illustrations of the body designed to display internal organs and structures using paper flaps. Their name arose from the frequency with which the accompanying sheets were torn or misplaced. This site reimagines the fugitive sheet as a misplaced code-snippet, framed within a randomly generated cut-out.',
  };
};

export default SheetPage;
