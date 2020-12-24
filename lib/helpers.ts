import { cdn } from '../config'
import { gridWidths, postWidths, formats } from '../config'

function getSrcSet(name: string, type: string, widths: number[]) {
  const srcSet = widths
    .map((width: number) => `${cdn}/${name}-${width}.${type} ${width}w`)
    .join(',')

  return {
    type,
    srcSet,
  }
}

// Grid
export function getGridSrcFromIndex(idx: number) {
  return `${cdn}/g-${idx}-${gridWidths[gridWidths.length - 1]}.jpeg`
}
export function getGridSrcSetsFromIndex(idx: number) {
  return formats.map((type) => getSrcSet(`g-${idx}`, type, gridWidths))
}

// Post
export function getPostSrcFromIndex(idx: number) {
  return `${cdn}/${idx}-500.webp`
}
export function getPostSrcSetsFromIndex(idx: number) {
  return formats.map((type) => getSrcSet(`${idx}`, type, postWidths))
}
