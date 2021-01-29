import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import Reducer from './reducers'
import App from './components/app'
import {init} from './components/auth/authActions'

require('./styles.css')
require('jquery')

const compedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(Reducer, compedEnhancer)

render(
    <Provider store={store}>
        <App title='Front-End-App'/>
    </Provider>,
    document.getElementById('root')
)