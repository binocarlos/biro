import defaultLayouts from './library/standard/layout'
import defaultLibrary from './library/standard'

export function get_layout(type, layoutProps = {}) {
  return layoutProps[type] || defaultLayouts[type]
}

export function get_library(type = 'text', libraryProps = {}) {
  return libraryProps[type] || defaultLibrary[type]
}

const api = {
  get_layout:get_layout,
  get_library:get_library
}

export default api