var upperCase = require('upper-case-first')
module.exports = {
  fieldTitle:function(field){
    var title = upperCase(field.title || field.name)
    return title
  }
}