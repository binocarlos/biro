import { BIRO_FIELD_UPDATE } from './actions/form'

const initialState = {

}

export default function update(state = initialState, action = {}) {

  switch (action.type) {
    case BIRO_FIELD_UPDATE:

      var formName = action.formname
      var fieldName = action.fieldname

      var formState = state[formName] || {}
      var data = formState.data || {}
      var meta = formState.meta || {}

      data[fieldName] = action.value
      meta[fieldName] = {
        error:action.error || false,
        dirty:true
      }

      formState.data = data
      formState.meta = meta
      var ret = Object.assign({}, state)
      ret[formName] = formState

      return ret
    default:
      return state
  }
}