import { BIRO_FIELD_UPDATE, BIRO_RESET_FORM } from './actions/form'

const initialState = {

}

function getObject(val){
  return Object.assign({}, val || {})
}

export default function update(state = initialState, action = {}) {

  switch (action.type) {
    case BIRO_FIELD_UPDATE:

      var formName = action.formname
      var fieldName = action.fieldname

      var formState = getObject(state[formName])
      var data = getObject(formState.data)
      var meta = getObject(formState.meta)

      data[fieldName] = action.value
      meta[fieldName] = {
        error:action.error || false,
        dirty:action.dirty || false
      }

      Object.keys(action.errors || {}).forEach(function(key){
        var fieldmeta = getObject(meta[fieldName])
        fieldmeta.error = action.errors[key]
        meta[fieldName] = fieldmeta
      })

      formState.data = data
      formState.meta = meta
      var ret = getObject(state)
      ret[formName] = formState

      return ret
    case BIRO_RESET_FORM:

      var formName = action.formname
      var formData = action.data
      
      var formState = getObject(state[formName])

      formState = {
        data:formData || {},
        meta:{}
      }
      
      var ret = getObject(state)
      ret[formName] = formState

      return ret
    default:
      return state
  }
}