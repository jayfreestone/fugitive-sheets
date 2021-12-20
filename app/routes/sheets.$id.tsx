import type { LoaderFunction, MetaFunction } from 'remix';
import createSheetMask from '~/blob/createSheetMask.server';
import { createBlobFromSeed } from '~/blob/createBlob';
import getSheet from '~/prose/getSheet';
import { decodeSeed } from '~/seed/encoding';
import SheetPage, { SheetData } from '~/components/SheetPage';
import createSeed from '~/seed/createSeed';

export const loader: LoaderFunction = async ({ params }) => {
  const seed = params.id;

  if (!seed) {
    throw new Response('Seed not found', { status: 404 });
  }

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
};

export const meta: MetaFunction = ({ data }: { data: SheetData }) => {
  const title = data
    ? `Sheet #${data.id} | Fugitive Sheets`
    : 'A truly fugitive sheet';

  return {
    title,
    'og:title': title,
    description:
      'Anatomical “fugitive sheets” are are illustrations of the body designed to display internal organs and structures using paper flaps. Their name arose from the frequency with which the accompanying sheets were torn or misplaced. This site reimagines the fugitive sheet as a misplaced code-snippet, framed within a randomly generated cut-out.',
  };
};

export default SheetPage;
