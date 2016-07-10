import React, { Component, PropTypes } from 'react'
import model from '../model'
import gui from '../gui'

export default class Form extends Component {

  componentWillReceiveProps(nextProps) {

    // this means we are setting a new value and should trigger
    // an update once we have validated
    if(!nextProps.meta){
      var newMeta = model.generate_meta(
        this.props.meta,
        this.props.data,
        model.process_schema(this.props.schema),
        this.props.validate)
      this.props.update(this.props.data, newMeta)
    }
  }

  render() {

    var props = this.props

    var schema = model.process_schema(props.schema)
    var formRenderer = gui.get_layout('form', props.layout)
    var rowRenderer = gui.get_layout('row', props.layout)

    function triggerUpdate() {
      var newMeta = model.generate_meta(
        props.meta,
        props.data,
        schema,
        props.validate)

      props.update(props.data, newMeta)
    }

    function renderRow(field) {
      var fieldComponent = gui.get_library(field.type, props.library)

      var fieldElement = React.createElement(fieldComponent, {
        title:field.title,
        value:props.data[field.name],
        error:props.meta.fields[field.name].error,
        schema:field,
        update:function(val){

          props.data[field.name] = val
          triggerUpdate()
          
        },
        blur:function(){

          props.meta.fields[field.name].dirty = true
          triggerUpdate()

        }
      })

      return React.createElement(rowRenderer, {
        field:field,
        key:'field' + field.name
      }, fieldElement)
    }

    return React.createElement(formRenderer, {}, schema.map(renderRow))
  }
}