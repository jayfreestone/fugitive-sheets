import fs from 'fs';
import fm from 'front-matter';
import path from 'path';

interface FileSheet {
  body: string;
  attributes: {
    title: string;
    link?: string;
  };
}

export const sheetPath = './netlify/functions/server/sheets';

function getSheet(id: string): FileSheet {
  const data = fs.readFileSync(path.join(sheetPath, `${id}.md`), 'utf8');

  const { body, attributes } = fm<FileSheet['attributes']>(data);

  if (attributes === null || typeof attributes !== 'object') {
    throw new Error('Sheet is missing attributes');
  }

  if (!('title' in attributes)) {
    throw new Error('Sheet is missing required metadata');
  }

  return { body, attributes };
}

export default getSheet;
