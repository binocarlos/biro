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

    var formState = this.props.formstate || {}
    var fieldUpdate = this.props.fieldupdate || function(){}
    var formData = formState.data || {}
    var fieldData = formState.fields || {}

    var formRenderer = getRenderer('form', this.props.formrenderer)
    var rowRenderer = getRenderer('row', this.props.rowrenderer)

    var schema = Schema(this.props.schema)
    var library = Library(this.props.library)

    var blankcounter = 0

    function renderRow(field){

      var name = field.name || 'field' + blankcounter++
      var title = (field.title || field.name).replace(/^\w/, function(c){
        return c.toUpperCase()
      })
      var fieldRenderer = library[field.type] || library.text
      var fieldMeta = fieldData[name] || {}
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

      return (
        <rowRenderer title={title}>
          <fieldRenderer 
            value={value} 
            error={error} 
            schema={field} 
            update={update} />
        </rowRenderer>
      )

      
    }

    return (
      <div>
        <formRenderer>
          {schema.map(renderRow)}
        </formRenderer>
      </div>
    )
  }
}