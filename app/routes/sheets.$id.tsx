import { useLoaderData } from "remix";
import type { LoaderFunction, MetaFunction } from "remix";
import createSheetMask from "~/blob/createSheetMask.server";
import Sheet from "~/components/Sheet";

interface SheetData {
  id: string;
  sheetImage: {
    left: string;
    right: string;
  };
}

export const loader: LoaderFunction = async ({ params }) => {
  const exampleSVG = `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M47,-60.7C54.8,-49.6,50.7,-28.9,54.8,-9.2C58.8,10.6,71.1,29.3,68.3,44.2C65.4,59.1,47.5,70.2,29.8,72.6C12.1,75,-5.3,68.7,-17.3,59.3C-29.3,49.9,-35.9,37.2,-45.9,24.4C-55.9,11.5,-69.2,-1.5,-70.9,-16.1C-72.7,-30.7,-62.8,-46.9,-49.1,-57C-35.3,-67.2,-17.7,-71.2,1,-72.4C19.6,-73.6,39.3,-71.9,47,-60.7Z" transform="translate(100 100)" />
    </svg>
  `;

  const [left, right] = createSheetMask(exampleSVG);

  const data: SheetData = {
    // @todo: add 404
    id: params.id || "n/a",
    sheetImage: { left, right },
  };

  return data;
};

export const meta: MetaFunction = ({ data }: { data: SheetData }) => {
  return {
    title: data ? `Sheet #${data.id}` : "A truly fugitive sheet",
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
    </div>
  );
}
