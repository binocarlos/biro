import React, { Component, PropTypes } from 'react'
import model from '../model'
import gui from '../gui'

export default class Form extends Component {

  triggerUpdate(meta, data, props, schema) {
    if(!schema) schema = model.process_schema(props.schema)
    var newMeta = model.generate_meta(
      meta,
      data,
      schema,
      props.validate)

    props.update && props.update(data, newMeta)
  }

  componentWillReceiveProps(nextProps) {

    // this means we are setting a new value and should trigger
    // an update once we have validated

    if(!nextProps.meta){
      this.triggerUpdate(nextProps.meta, nextProps.data, nextProps)
    }
  }

  componentWillMount() {
    if(!this.props.meta){
      this.triggerUpdate(this.props.meta, this.props.data, this.props)
    }
  }

  render() {

    var props = this.props
    var self = this

    var meta = JSON.parse(JSON.stringify(props.meta || {}))
    var data = JSON.parse(JSON.stringify(props.data || {}))

    if(!meta.fields){
      meta.fields = {}
    }

    var schema = model.process_schema(props.schema)
    var formRenderer = gui.get_layout('form', props.layout)
    var rowRenderer = gui.get_layout('row', props.layout)

    function renderRow(field) {
      var fieldComponent = gui.get_library(field.type, props.library)
      var metaEntry = meta.fields[field.name] || {}

      var fieldElement = React.createElement(fieldComponent, {
        title:field.title,
        value:data[field.name],
        data:data,
        error:metaEntry.error,
        dirty:metaEntry.dirty,
        valid:metaEntry.valid,
        schema:field,
        update:function(val){

          data[field.name] = val
          self.triggerUpdate(meta, data, props, schema)
          
        },
        blur:function(){

          var metaEntry = meta.fields[field.name]

          // only flag the field as dirty if it has changed
          // errors display if the field is dirty
          if(metaEntry && metaEntry.changed){
            metaEntry.dirty = true
          }

          meta.fields[field.name] = metaEntry

          self.triggerUpdate(meta, data, props, schema)

        }
      })

      return React.createElement(rowRenderer, {
        title:field.title,
        field:field,
        key:'field' + field.name
      }, fieldElement)
    }

    return React.createElement(formRenderer, {}, schema.map(renderRow))
  }
}