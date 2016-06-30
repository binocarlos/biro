import { 
  BIRO_FIELD_UPDATE,
  BIRO_RESET_FORM,
  BIRO_VALIDATE_FORM,
  BIRO_VALIDATE_UPDATE } from './actions/form'

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
        var fieldmeta = getObject(meta[key])
        fieldmeta.error = action.errors[key]
        meta[key] = fieldmeta
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

    // flag the form as needing a forced validation
    case BIRO_VALIDATE_FORM:
      var formName = action.formname
      var formState = getObject(state[formName])
      formState.force_validate = true

      var ret = getObject(state)
      ret[formName] = formState

      return ret

    // we have the results from the forced validation
    // dont forget to reset the flag
    case BIRO_VALIDATE_UPDATE:
      var formName = action.formname
      
      var formState = getObject(state[formName])
      var meta = getObject(formState.meta)

      Object.keys(action.errors || {}).forEach(function(key){
        meta[key] = {
          dirty:true,
          error:action.errors[key]
        }
      })

      formState.meta = meta
      formState.force_validate = false
      var ret = getObject(state)
      ret[formName] = formState

      return ret

    default:
      return state
  }
}