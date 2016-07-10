import 'babel-polyfill'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import Biro from '../lib'

const FORM_UPDATE = 'FORM_UPDATE'

function formUpdateAction(data, meta){
  return {
    type:FORM_UPDATE,
    data:data,
    meta:meta
  }
}


const SCHEMA = [
  'firstname',   // this is turned into {type:'text',name:'firstname'}
  'surname',
  'email',
  {
    type:'text',
    name:'phone'
  }
]

const initialState = {
  data:{},
  meta:null
}

const reducer = combineReducers({
  form: function(state = initialState, action = {}) {
    switch (action.type) {
      case FORM_UPDATE:
        return Object.assign({}, state, {
          data:action.data,
          meta:action.meta
        })
      default:
        return state
    }
  }
})

/*
  store
*/
const finalCreateStore = compose(
  applyMiddleware.apply(null, []),
  window.devToolsExtension && window.devToolsExtension()
)(createStore)

const store = finalCreateStore(reducer)


class MyForm extends Component {
  render() {
    return (
      <Biro 
        data={this.props.data}
        meta={this.props.meta}
        schema={SCHEMA}
        update={this.props.update} />
    )
  }
}


function mapStateToProps(state, ownProps) {
  return {
    data:state.form.data,
    meta:state.form.meta
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    update:function(data, meta){
      dispatch(formUpdateAction(data, meta))
    }
  }
}

var FormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyForm)

/*
  routes
*/
ReactDOM.render(  
  <Provider store={store}>
    <FormContainer /> 
  </Provider>,
  document.getElementById('mount')
)
