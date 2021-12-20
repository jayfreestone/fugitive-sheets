import fs from 'fs';
import path from 'path';

// Would usually be smarter about this and leave caching up to
// the root/entry point, but not worth the effort for this.
let ids: string[];

function getSheetIDs() {
  if (!ids) {
    const files = fs.readdirSync('./sheets');
    ids = files.map((filename) => path.parse(filename).name);
  }

  return ids;
}

export default getSheetIDs;
