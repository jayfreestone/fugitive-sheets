import blobshape from 'blobshape';

const size = 200;

export function createBlobSeed(): string {
  return blobshape({ size }).seedValue;
}

export function createBlobFromSeed(seed: string): string {
  const { path } = blobshape({ seed, size });

  return `
    <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <path d="${path}" />
    </svg>
  `;
}
