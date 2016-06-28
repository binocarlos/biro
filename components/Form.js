import React, { Component, PropTypes } from 'react'
import FormRenderer from '../library/standard/layout/Form'
import RowRenderer from '../library/standard/layout/Row'
import Schema from '../schema'
import Library from '../library'

const defaultRenderers = {
  form:FormRenderer,
  row:RowRenderer
}

function getRenderer(type, value){
  return value || defaultRenderers[type]
}

export default class Form extends Component {
  render() {

    // from mapStateToProps
    var formState = this.props.formstate || {}

    // from mapDispatchToProps
    var fieldUpdate = this.props.fieldupdate || function(){}

    var formData = formState.data || {}
    var formMeta = formState.meta || {}

    var formRenderer = getRenderer('form', this.props.formrenderer)
    var rowRenderer = getRenderer('row', this.props.rowrenderer)

    var schema = Schema(this.props.schema)
    var library = Library(this.props.library)

    var counter = 0

    function renderRow(field){

      counter++

      var name = field.name || 'field' + counter
      var title = (field.title || field.name).replace(/^\w/, function(c){
        return c.toUpperCase()
      })
      var fieldRenderer = library[field.type] || library.text
      var fieldMeta = formMeta[name] || {}
      var value = formData[name]
      var error = fieldMeta.error || ''

      function update(val){
        var error = false
        if(typeof(field.validate)==='function'){
          error = field.validate(val)
        }
        fieldUpdate({
          name:name,
          value:value,
          error:error
        })
      }

      return React.createElement(rowRenderer, {
        title:title,
        key:'field' + counter
      }, React.createElement(fieldRenderer, {
        value:value,
        error:error,
        schema:field,
        update:update
      }))
    }

    return React.createElement(formRenderer, {}, schema.map(renderRow))
  }
}