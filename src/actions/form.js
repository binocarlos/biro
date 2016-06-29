export const BIRO_FIELD_UPDATE = 'BIRO_FIELD_UPDATE'
export const BIRO_RESET_FORM = 'BIRO_RESET_FORM'

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