import fs from 'fs';
import path from 'path';

function getSheetIDs() {
  const files = fs.readdirSync('./sheets');
  return files.map((filename) => path.parse(filename).name);
}

export default getSheetIDs;
