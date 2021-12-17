import { useLoaderData } from "remix";
import type { LoaderFunction, MetaFunction } from "remix";

interface SheetData {
  id: string;
}

export const loader: LoaderFunction = async ({ params }) => {
  return { id: params.id };
};

export const meta: MetaFunction = ({ data }: { data: SheetData }) => {
  return {
    title: data ? `Sheet #${data.id}` : "A truly fugitive sheet",
  };
};

export default function Sheet() {
  const data = useLoaderData<SheetData>();

  return (
    <h1>
      The sheet is {data.id}
    </h1>
  );
}
