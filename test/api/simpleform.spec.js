import expect from 'expect'
import React from 'react'
import $ from 'jquery'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import {isComponentOfType,findWithClass} from 'react-shallow-testutils'

import { Form as Biro } from '../../lib/containers/Form'
import standardLibrary from '../../lib/library/standard'

const FORM_SCHEMA = [
  'name',
  'color'
]

const data = {
  name:'apples',
  color:'red'
}

const meta = {
  fields:{
    name:{
      valid:true
    },
    color:{
      valid:true
    }
  }
}

const DEFAULT_PROPS = {
  library:standardLibrary,
  schema:FORM_SCHEMA,
  data:data,
  meta:meta
}

function getProps(props = {}){
  return Object.assign({
    update:expect.createSpy()
  }, DEFAULT_PROPS, props)
}

function setup(props){

  let renderer = TestUtils.createRenderer()
  renderer.render(<Biro {...props} />)
  let output = renderer.getRenderOutput()

  return {
    output,
    props,
    renderer
  }
}

function setupDOM(props) {
  let component = TestUtils.renderIntoDocument(<Biro {...props} />)
  return ReactDOM.findDOMNode(component)
}

describe('API: SimpleForm', () => {

  // a full on DOM test for the entire container page with all
  // sub-components rendered
  it('should render the entire page with data', () => {

    let rootElement = setupDOM(getProps())

    let inputs = $(rootElement).find('input')

    expect(inputs.length).toBe(2)
  })

  it('should trigger an immediate update if no meta is given', () => {

    var props = getProps({
      meta:null
    })
    let rootElement = setupDOM(props)

    expect(props.update.calls.length).toBe(1)

  })



})
