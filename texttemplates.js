var textTemplates = {
  text:'text',
  number:'text',
  date:'date',
  time:'time',
  datetimelocal:'dateTimeLocal',
  datetime:'dateTimeLocal',
  month:'month',
  week:'week'
}
module.exports = {
  types:textTemplates,
  inputType:function(type){
    type = type || 'text'
    return textTemplates[type.toLowerCase()]
  }
}