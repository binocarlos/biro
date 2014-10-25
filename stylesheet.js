var fs = require('fs')
var insertCss = require('insert-css')
var css = fs.readFileSync(__dirname + '/style.css')
insertCss(css)
