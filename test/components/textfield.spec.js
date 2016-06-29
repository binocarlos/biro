import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import TextField from '../../library/standard/components/TextField'

function setup(value){
  var props = {
    onChange:expect.createSpy(),
    value:value
  }

  let renderer = TestUtils.createRenderer()
  renderer.render(<TextField {...props} />)
  let output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}

describe('Component: TextField', () => {

  it('should render', () => {
    
    const { output } = setup()

    expect(output.type).toBe('input')
    expect(output.props.type).toBe('text')
    expect(output.props.value).toBe(undefined)

  })


  it('should accept a value', () => {
    
    const { output } = setup('apples')

    expect(output.props.value).toBe('apples')

  })



  it('should call the onChange function', () => {
    
    const { output, props } = setup('apples')

    expect(props.onChange.calls.length).toBe(0)

    output.props.onChange({
      target:{
        value:'oranges'
      }
    })

    expect(props.onChange.calls.length).toBe(1)
    expect(props.onChange.calls[0].arguments).toEqual(['oranges'])

  })



})
