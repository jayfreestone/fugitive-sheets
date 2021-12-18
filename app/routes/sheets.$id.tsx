import { Link, useLoaderData } from 'remix';
import type { LoaderFunction, MetaFunction } from 'remix';
import createSheetMask from '~/blob/createSheetMask.server';
import Sheet from '~/components/Sheet';
import { createBlobFromSeed, createBlobSeed } from '~/blob/createBlob';

interface SheetData {
  id: string;
  sheetImage: {
    left: string;
    right: string;
  };
}

export const loader: LoaderFunction = async ({ params }) => {
  const seed = params.id;

  if (!seed) {
    throw new Response('Seed not found', { status: 404 });
  }

  const svg = createBlobFromSeed(seed);
  const [left, right] = createSheetMask(svg);

  const data: SheetData = {
    id: seed,
    sheetImage: { left, right },
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
    <div>
      <h1>The sheet is {data.id}</h1>
      <Sheet
        left={data.sheetImage.left}
        right={data.sheetImage.right}
        copy="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et orci id risus lobortis tincidunt. In quis erat sed nunc euismod facilisis in vitae turpis. Nullam et quam a justo vestibulum commodo. Suspendisse cursus felis quis lectus blandit consequat. Sed ut congue ipsum. Phasellus nec condimentum arcu. Maecenas vitae nisi leo. Pellentesque porta, libero vel placerat scelerisque, elit turpis vulputate purus, rutrum commodo mi erat et diam. Etiam feugiat pulvinar mauris, at maximus tellus porttitor at. Maecenas eu urna pulvinar, dapibus tortor ut, interdum turpis. In pretium ac quam eget euismod. Fusce vel urna a leo aliquam tristique vitae laoreet urna. Ut pharetra aliquet ante non cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et orci id risus lobortis tincidunt. In quis erat sed nunc euismod facilisis in vitae turpis. Nullam et quam a justo vestibulum commodo. Suspendisse cursus felis quis lectus blandit consequat. Sed ut congue ipsum. Phasellus nec condimentum arcu. Maecenas vitae nisi leo. Pellentesque porta, libero vel placerat scelerisque, elit turpis vulputate purus, rutrum commodo mi erat et diam. Etiam feugiat pulvinar mauris, at maximus tellus porttitor at. Maecenas eu urna pulvinar, dapibus tortor ut, interdum turpis. In pretium ac quam eget euismod. Fusce vel urna a leo aliquam tristique vitae laoreet urna. Ut pharetra aliquet ante non cursus. Maecenas eu urna pulvinar, dapibus tortor ut, interdum turpis. In pretium ac quam eget euismod. Fusce vel urna a leo aliquam tristique vitae laoreet urna. Ut pharetra aliquet ante non cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et orci id risus lobortis tincidunt. In quis erat sed nunc euismod facilisis in vitae turpis. Nullam et quam a justo vestibulum commodo. Suspendisse cursus felis quis lectus blandit consequat. Sed ut congue ipsum. Phasellus nec condimentum arcu. Maecenas vitae nisi leo. Pellentesque porta, libero vel placerat scelerisque, elit turpis vulputate purus, rutrum commodo mi erat et diam. Etiam feugiat pulvinar mauris, at maximus tellus porttitor at. Maecenas eu urna pulvinar, dapibus tortor ut, interdum turpis. In pretium ac quam eget euismod. Fusce vel urna a leo aliquam tristique vitae laoreet urna. Ut pharetra aliquet ante non cursus."
      />
      <Link to={`/sheets/${createBlobSeed()}`}>Next</Link>
    </div>
  );
}
