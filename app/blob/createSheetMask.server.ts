import { JSDOM } from "jsdom";

function createSheetMask(svgStr: string): [string, string] {
  const { document } = new JSDOM(svgStr).window;

  const innerSVG = document.querySelector("svg") as SVGElement;
  const elems = splitInverted(innerSVG);
  const [left, right] = elems.map((elem) => elem.outerHTML);

  return [left, right];
}

function splitInverted(elem: SVGElement): [SVGElement, SVGElement] {
  const viewBox = elem.getAttribute("viewBox");

  if (viewBox == null) {
    throw new Error("Must provide a viewBox attribute");
  }

  const [viewX, viewY, viewWidth, viewHeight] = viewBox.split(" ");

  const left = cloneInverted(elem);
  left.setAttribute(
    "viewBox",
    [viewX, viewY, Number(viewWidth) / 2, viewHeight].join(" ")
  );

  const right = cloneInverted(elem);
  right.setAttribute(
    "viewBox",
    [viewX, viewY, Number(viewWidth) / 2, viewHeight].join(" ")
  );

  const rightGroup = right.querySelector(".inner-children") as SVGGElement;
  rightGroup.setAttribute("transform", `translate(${-viewWidth / 2} 0)`);

  return [left, right];
}

function cloneInverted(elem: SVGElement) {
  const { document } = new JSDOM().window;
  const maskedClone = elem.cloneNode(true) as SVGElement;

  const viewBox = maskedClone.getAttribute("viewBox");

  if (viewBox == null) {
    throw new Error("Must provide a viewBox attribute");
  }

  const [, , viewWidth, viewHeight] = viewBox.split(" ");

  const maskRect = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );
  maskRect.setAttribute("fill", "white");
  maskRect.setAttribute("width", viewWidth);
  maskRect.setAttribute("height", viewHeight);

  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  group.setAttribute("class", "inner-children");

  const maskId = `mask-${Math.random()}`;
  const mask = document.createElementNS("http://www.w3.org/2000/svg", "mask");
  mask.setAttribute("id", maskId);
  mask.appendChild(maskRect);

  // Actually moves the children into the mask
  // @todo: better way of doing multiple elements?
  // No need to worry about DOM performance here since we're server-side.
  Array.from(maskedClone.children).map((child) => group.appendChild(child));
  mask.appendChild(group);

  const mainRect = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );
  mainRect.setAttribute("mask", `url(#${maskId})`);
  mainRect.setAttribute("width", viewWidth);
  mainRect.setAttribute("height", viewHeight);

  maskedClone.appendChild(mask);
  maskedClone.appendChild(mainRect);

  return maskedClone;
}

export default createSheetMask;
