var templates = {
  layout:{
    basic:require('./templates/layout/basic'),
    horizontal:require('./templates/layout/horizontal'),
    inline:require('./templates/layout/inline')
  },
  field:{/*
  	text:fs.readFileSync(__dirname + '/templates/field/text.html', 'utf8'),
  	radio:fs.readFileSync(__dirname + '/templates/field/radio.html', 'utf8'),
  	checkbox:fs.readFileSync(__dirname + '/templates/field/checkbox.html', 'utf8'),
    select:fs.readFileSync(__dirname + '/templates/field/select.html', 'utf8'),
    textarea:fs.readFileSync(__dirname + '/templates/field/textarea.html', 'utf8')*/
  }
}

module.exports = templates