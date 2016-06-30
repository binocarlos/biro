export const BIRO_FIELD_UPDATE = 'BIRO_FIELD_UPDATE'
export const BIRO_RESET_FORM = 'BIRO_RESET_FORM'
export const BIRO_VALIDATE_FORM = 'BIRO_VALIDATE_FORM'
export const BIRO_VALIDATE_UPDATE = 'BIRO_VALIDATE_UPDATE'

export function fieldUpdate(props) {

  return {
    type:BIRO_FIELD_UPDATE,
    ...props
  }

}

export function resetForm(formname, data) {
  return {
    type:BIRO_RESET_FORM,
    data,
    formname
  }
}

// trigger a forced form validation
export function validateForm(formname) {
  return {
    type:BIRO_VALIDATE_FORM,
    formname
  }
}

// get the results from a forced validation
export function validateUpdate(formname, errors) {
  return {
    type:BIRO_VALIDATE_UPDATE,
    formname,
    errors
  }
}