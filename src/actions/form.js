export const BIRO_FIELD_UPDATE = 'BIRO_FIELD_UPDATE'

export function fieldUpdate(props) {

  return {
    type:BIRO_FIELD_UPDATE,
    ...props
  }

}