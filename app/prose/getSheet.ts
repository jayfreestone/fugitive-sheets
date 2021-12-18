import fs from 'fs';
import fm from 'front-matter';

interface FileSheet {
  body: string;
  attributes: {
    title: string;
    link: string;
  };
}

function getSheet(id: string): FileSheet {
  const data = fs.readFileSync(`./sheets/${id}.md`, 'utf8');

  const { body, attributes } = fm<FileSheet['attributes']>(data);

  if (attributes === null || typeof attributes !== 'object') {
    throw new Error('Sheet is missing attributes');
  }

  if (!('title' in attributes) || !('link' in attributes)) {
    throw new Error('Sheet is missing required metadata');
  }

  return { body, attributes };
}

export default getSheet;
