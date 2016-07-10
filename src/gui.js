import defaultLayouts from './library/standard/layout'
import TextField from './library/standard/components/TextField'

export function get_layout(type, layoutProps = {}) {
  return layoutProps[type] || defaultLayouts[type]
}

export function get_library(type, libraryProps = {}) {
  return libraryProps[type] || TextField
}

const api = {
  get_layout:get_layout,
  get_library:get_library
}

export default api