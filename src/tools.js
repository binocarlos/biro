export function getFormState(state, ownProps){

  // the top-level property we are writing to in the state
  // use statename for backwards compat
  var reducerName = ownProps.reducername || ownProps.statename || 'biro'

  var allFormState = state[reducerName]
  var formState = allFormState[ownProps.name]

  return formState
}