import blobshape from 'blobshape';

const size = 200;

export function createBlobSeed(): string {
  const growth = randomBetween(4, 6);
  const edges = randomBetween(6, 20);

  const params = new URLSearchParams({
    growth: String(growth),
    edges: String(edges),
  });

  const shape = blobshape();

  return `${shape.seedValue}?${params.toString()}`;
}

export function createBlobFromSeed(seed: string): string {
  const [blobSeed, params] = seed.split('?');
  const decodedParams = new URLSearchParams(params);

  const { path } = blobshape({
    size,
    seed: blobSeed,
    growth: Number(decodedParams.get('growth')) || 6,
    edges: Number(decodedParams.get('edges')) || 6,
  });

  return `
    <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <path d="${path}" />
    </svg>
  `;
}

function randomBetween(lower: number, higher: number): number {
  return Math.floor(Math.random() * (higher - lower + 1) + lower);
}
