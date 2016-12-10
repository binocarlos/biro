// process the list of field definitions provided
// turn strings into name=XXX,type=text
export function process_schema(fields) {
  fields = fields || []
  return fields.map(function(field){
    var ret = typeof(field)==='string' ? {
      name:field
    } : field

    ret.type = ret.type || 'text'
    ret.title = ret.title || ret.name.replace(/^\w/, function(c){
      return c.toUpperCase()
    })

    return ret
  })
}

// get the calculated meta data
export function generate_meta(meta, data, schema, validate){

  // initialize the meta data
  if(!meta){
    meta = {
      valid:true,
      dirty:false,
      changed:false,
      olddata:data || {},
      fields:{}
    }
  }
  else{
    meta = JSON.parse(JSON.stringify(meta))
  }

  var olddata = meta.olddata || {}

  // loop each field in the form and initialize it's field
  // entry as well as apply schema validation
  schema.forEach(function(field){
    var error = null
    var valid = true
    var value = data[field.name]
    var oldvalue = olddata[field.name]
    
    if(typeof(field.validate)==='function'){
      var error = field.validate(value)
      error = typeof(error)==='string' ? error : null
    }
    var entry = meta.fields[field.name] || {}

    if(error){
      valid = false
      entry.error = error
    }
    else{
      delete(entry.error)
    }
    var changed = oldvalue!=value
    entry.valid = valid
    entry.changed = changed
    entry.dirty = entry.dirty || false
    meta.fields[field.name] = entry
  })

  // apply the all valiation function
  if(typeof(validate)==='function'){
    var allErrors = validate(data, meta)
    if(typeof(allErrors)==='object'){
      Object.keys(allErrors || {}).forEach(function(key){
        meta.fields[key].valid = false
        meta.fields[key].error = allErrors[key]
      })
    }
  }

  // work out the global dirty and valid properties
  var allValid = true
  var allDirty = false
  var allChanged = false

  Object.keys(meta.fields || {}).forEach(function(key){
    var entry = meta.fields[key]
    if(!entry.valid) allValid = false
    if(entry.dirty) allDirty = true
    if(entry.changed) allChanged = true
  })

  meta.valid = allValid
  meta.dirty = allDirty
  meta.changed = allChanged

  return meta
}

const api = {
  process_schema:process_schema,
  generate_meta:generate_meta
}

export default api