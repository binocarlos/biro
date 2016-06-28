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

  it('should render', () => {

    const { output } = setup(getProps())
    console.log(JSON.stringify(output, null, 4))

/*
    var searchHolder = findWithClass(output, 'space-section-bottom')
    
    // test that the search bar is rendered
    expect(isComponentOfType(searchHolder.props.children, SearchBar)).toBe(true)
    expect(searchHolder.props.children.props.value).toBe('apples')

    // test that the table is rendered
    var table = output.props.children[1]
    expect(isComponentOfType(table, DatasetTable)).toBe(true)
    expect(table.props.data).toEqual(DEFAULT_DATA)
*/
  })

  // a full on DOM test for the entire container page with all
  // sub-components rendered
  it('should render the entire page with data', () => {

    let rootElement = setupDOM(getProps())

    console.dir(rootElement)

/*
    let table = $(rootElement).find('table')

    expect(table.length).toBe(1)

    let trs = table.find('tr')

    let dataTds = trs.eq(1).find('td')

    var values = []
    dataTds.each(function(){
      values.push($(this).html())
    })

    expect(values[0]).toBe('123')
*/
  })



})
