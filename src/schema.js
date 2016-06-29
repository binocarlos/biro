// process the list of field definitions provided
// turn strings into name=XXX,type=text
export default function schema(fields) {
  fields = fields || []
  return fields.map(function(field){
    var ret = typeof(field)==='string' ? {
      name:field
    } : field

    ret.type = ret.type || 'text'

    return ret
  })
}