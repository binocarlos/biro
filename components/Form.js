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

    var formRenderer = getRenderer('form', this.props.formrenderer)
    var rowRenderer = getRenderer('row', this.props.rowrenderer)

    var schema = Schema(this.props.schema)
    var library = Library(this.props.library)

    /*
    
      <formRenderer>
          {schema.map(fieldRenderer)}
        </formRenderer>
      
    */

    return (
      <div>
          hello
      </div>
    )
  }
}