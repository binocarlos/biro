import expect from 'expect'
import React from 'react'
import $ from 'jquery'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import {isComponentOfType,findWithClass} from 'react-shallow-testutils'

import { Form as Biro } from '../../containers/Form'
import standardLibrary from '../../library/standard'

const FORM_SCHEMA = [
  'name',
  'color'
]

const DEFAULT_PROPS = {
  name:'myform',
  library:standardLibrary,
  schema:FORM_SCHEMA
}

function getProps(props = {}){
  return Object.assign({}, DEFAULT_PROPS, props)
}

function setup(props){

  let renderer = TestUtils.createRenderer()
  renderer.render(<Biro {...props} />)
  let output = renderer.getRenderOutput()

  return {
    output,
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



})
