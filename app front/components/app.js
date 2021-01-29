import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Landing from './auth/landing'
import Profile from './profile/profile'
import Main from './main/main'
//basic sturcture of each "page"
export const App = ({location}) => {

    if (location == "MAIN_PAGE"){
        return <Main/>
    }
    else if (location == "PROFILE_PAGE"){
        return <Profile/>
    }
    else{
        return <Landing/>
    }

}

export default connect(
    (state) => {
        return {
            location:state.location,
        }
    },
    (dispatch) => {
        return {

        }
    }
)(App)