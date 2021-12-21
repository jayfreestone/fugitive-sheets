import type { LoaderFunction } from 'remix';
import SheetPage, { SheetData } from '~/components/SheetPage';
import createSeed from '~/seed/createSeed';
import { decodeSeed } from '~/seed/encoding';
import { createBlobFromSeed } from '~/blob/createBlob';
import createSheetMask from '~/blob/createSheetMask.server';
import getSheet from '~/prose/getSheet';
import { json, useLoaderData, useTransition } from 'remix';

export function headers() {
  return {
    'Cache-Control': 'max-age=4, s-maxage=4',
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

  return json(data);
};

export default function Index() {
  const data = useLoaderData<SheetData>();
  const transition = useTransition();

  return <SheetPage data={data} transitionState={transition.state} />;
}
