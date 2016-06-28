// process the list of field definitions provided
// turn strings into name=XXX,type=text
export default function schema(fields) {
  fields = fields || []
  return fields.map(function(field){
    return typeof(field)==='string' ? {
      name:field,
      type:'text'
    } : field
  })
}