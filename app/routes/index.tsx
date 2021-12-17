import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData } from "remix";

type IndexData = {};

export const loader: LoaderFunction = () => {
  const data: IndexData = {};
  return data;
};

export const meta: MetaFunction = () => {
  return {
    title: "Fugitive Sheets",
  };
};

export default function Index() {
  const data = useLoaderData<IndexData>();

  return (
    <div>
      <main>
        <p>Anatomical “fugitive” sheets, so named because of their unfortunate tendency of being torn or misplaced over time, allowed readers to visualize the layers of organs lying beneath an illustrated subject’s flesh. Any observer could see the interior of the body through stages of dissection without the limitations set by a decaying corpse.</p>
      </main>
    </div>
  );
}
