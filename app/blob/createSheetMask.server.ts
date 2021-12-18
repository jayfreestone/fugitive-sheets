import { JSDOM } from 'jsdom';

function createSheetMask(svgStr: string): [string, string] {
  const { document } = new JSDOM(svgStr).window;

  const innerSVG = document.querySelector('svg') as SVGElement;
  const elems = splitInverted(innerSVG);
  const [left, right] = elems.map((elem) => elem.outerHTML);

  return [left, right];
}

function splitInverted(elem: SVGElement): [SVGElement, SVGElement] {
  const viewBox = elem.getAttribute('viewBox');
  assertAttribute(viewBox, 'viewBox');

  const [viewX, viewY, viewWidth, viewHeight] = viewBox.split(' ');

  const left = cloneInverted(elem);
  left.setAttribute(
    'viewBox',
    [viewX, viewY, Number(viewWidth) / 2, viewHeight].join(' ')
  );

  const right = cloneInverted(elem);
  right.setAttribute(
    'viewBox',
    [viewX, viewY, Number(viewWidth) / 2, viewHeight].join(' ')
  );

  const rightGroup = right.querySelector('.inner-children') as SVGGElement;
  rightGroup.setAttribute('transform', `translate(${-viewWidth / 2} 0)`);

  return [left, right];
}

function cloneInverted(elem: SVGElement) {
  const { document } = new JSDOM().window;
  const maskedClone = elem.cloneNode(true) as SVGElement;

  const viewBox = maskedClone.getAttribute('viewBox');
  assertAttribute(viewBox, 'viewBox');

  const [, , viewWidth, viewHeight] = viewBox.split(' ');

  const maskRect = createSVGElement(document, 'rect');
  maskRect.setAttribute('fill', 'white');
  maskRect.setAttribute('width', viewWidth);
  maskRect.setAttribute('height', viewHeight);

  const group = createSVGElement(document, 'g');
  group.setAttribute('class', 'inner-children');

  const maskId = `mask-${Math.random()}`;
  const mask = createSVGElement(document, 'mask');
  mask.setAttribute('id', maskId);
  mask.appendChild(maskRect);

  // Moves the children into the mask
  // No need to worry about DOM performance here since we're server-side.
  Array.from(maskedClone.children).map((child) => group.appendChild(child));
  mask.appendChild(group);

  const mainRect = createSVGElement(document, 'rect');
  mainRect.setAttribute('mask', `url(#${maskId})`);
  mainRect.setAttribute('width', viewWidth);
  mainRect.setAttribute('height', viewHeight);

  maskedClone.appendChild(mask);
  maskedClone.appendChild(mainRect);

  return maskedClone;
}

function createSVGElement<K extends keyof SVGElementTagNameMap>(
  document: Document,
  tag: K
) {
  return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

function assertAttribute(
  value: string | null,
  message: string
): asserts value is string {
  if (value === null) {
    throw new Error(`Attribute not defined: ${message}`);
  }
}

export default createSheetMask;
