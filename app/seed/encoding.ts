export function encodeSeed(blobSeed: string, sheetId: string) {
  const id = [blobSeed, sheetId].join(':');
  const buff = new Buffer(id);
  return buff.toString('base64');
}

export function decodeSeed(data: string) {
  const buff = new Buffer(data, 'base64');
  const [blobSeed, sheetId] = buff.toString('ascii').split(':');

  if (!blobSeed) {
    throw new Error('blob seed was not defined');
  }

  if (!sheetId) {
    throw new Error('sheet id was not defined');
  }

  return [blobSeed, sheetId];
}
