import getSheetIDs from '~/prose/getSheetIDs';
import { encodeSeed } from '~/seed/encoding';
import { createBlobSeed } from '~/blob/createBlob';

function createSeed(): string {
  const sheetIDs = getSheetIDs();
  const randomSheetId = sheetIDs[Math.floor(Math.random() * sheetIDs.length)];
  return encodeSeed(createBlobSeed(), randomSheetId);
}

export default createSeed;
