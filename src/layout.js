import defaultLayouts from './library/standard/layout'
  
export function get_layout(type, layoutProps = {}) {
  return layoutProps[type] || defaultLayouts[type]
}

const api = {
  process_schema:process_schema,
  generate_meta:generate_meta
}

export default api