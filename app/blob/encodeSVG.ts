function encodeSVG(svgStr: string) {
  return `url("data:image/svg+xml,${encodeURIComponent(svgStr)}")`;
}

// function encodeSVG(elem: SVGElement) {
//   const markup = elem.outerHTML;
//   return `url("data:image/svg+xml,${encodeURIComponent(markup)}")`;
// }

export default encodeSVG;
