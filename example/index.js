import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore, combineReducers } from 'redux'

import biroreducer from '../reducer'
import Biro from '../'

const SCHEMA = [
  'firstname',   // this is turned into {type:'text',name:'firstname'}
  'surname',
  'email',
  {
    type:'text',
    name:'phone'
  }
]

const reducer = combineReducers({
  biro: biroreducer
})

/*
  store
*/
const finalCreateStore = compose(
  applyMiddleware.apply(null, [])
)(createStore)

const store = finalCreateStore(reducer)

/*
  routes
*/
ReactDOM.render(  
  <Provider store={store}>
    <Biro 
          name="contact"
          schema={SCHEMA} />
  </Provider>,
  document.getElementById('mount')
)
