import standardLibrary from './library/standard'

// process the given library filling in the defaults
export default function library(fields) {
  fields = fields || {}
  return Object.assign({}, standardLibrary, fields)
}