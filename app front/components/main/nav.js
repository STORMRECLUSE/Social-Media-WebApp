import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../auth/authActions'
//basic structure of the nav bar
export const Nav = ({location,dispatch,user}) => {
    let headline;
    return(
     <div className="navbar">
        <input id="goProfile" className="btn" type="submit" value="Edit Profile"
        onClick={(event) =>
                {event.preventDefault();
                goProfile(location,dispatch,user)}
                }/>
        <input id="goLanding" className="btn" type="submit" value="Log Out"
        onClick={(event) =>
                {event.preventDefault();
                goLanding(location,dispatch)}
                }/>
        <br/>
    </div>
)
}
//go to the profile page
const goProfile=(location,dispatch,user)=>{
 //   location='PROFILE_PAGE'
    dispatch({type: 'TO_PROFILE_PAGE'}, user)
    dispatch({type: 'IS_PROFILE_ERROR', errProfileInfo:''})
}
//go to the landing page
const goLanding=(location,dispatch)=>{
 //   dispatch({type: 'TO_OUT'})
    dispatch(logout())
    dispatch({type: 'IS_LOG_ERROR', errLogInfo:''})
    dispatch({type: 'IS_REG_ERROR', errRegInfo:''})
}


export default connect(
    (state) => {
        return {
            location:state.location,
            user: state.user
        }
    },null
)(Nav)