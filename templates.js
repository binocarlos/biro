var textTypes = {
  text:'text',
  number:'text',
  date:'date',
  time:'time',
  datetimelocal:'dateTimeLocal',
  datetime:'dateTimeLocal',
  month:'month',
  week:'week'
}

function textInputType(type){
  type = type || 'text'
  return textTypes[type.toLowerCase()]
}

function isTextTemplate(def){
  var type = def.type || 'text'
  return type === 'text' || def.isText
}

var layoutTemplates = {
  basic:require('./templates/layout/basic'),
  horizontal:require('./templates/layout/horizontal'),
  inline:require('./templates/layout/inline')
}

var fieldTemplates = {
  text:require('./templates/field/text')

/*
  text:fs.readFileSync(__dirname + '/templates/field/text.html', 'utf8'),
  radio:fs.readFileSync(__dirname + '/templates/field/radio.html', 'utf8'),
  checkbox:fs.readFileSync(__dirname + '/templates/field/checkbox.html', 'utf8'),
  select:fs.readFileSync(__dirname + '/templates/field/select.html', 'utf8'),
  textarea:fs.readFileSync(__dirname + '/templates/field/textarea.html', 'utf8')*/
}

function fieldTemplate(field){
  var type = field.type || 'text'
  if(field.isText) type = 'text'
  type = 'text'
  if(textTypes[type.toLowerCase()]){
    return fieldTemplates.text
  }
  else if(field.template){
    return field.template
  }
  else{
    if(fieldTemplates[field.type]){
      return fieldTemplates[field.type]
    }
    else{
      return fieldTemplates.text
    }
  }
}

var templates = {
  layout:layoutTemplates,
  field:fieldTemplates,
  fieldTemplate:fieldTemplate,
  textTypes:textTypes,
  textInputType:textInputType
}

module.exports = templates