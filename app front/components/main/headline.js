import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { resource } from '../../actions'

//headline basic structure
export const Headline = ({user,dispatch}) => {
    let status;
    return(
     <div>
        <img src={user.avatar}/>
        <div>{user.name}</div>
        <div id='status'><b>{user.headline}</b></div>
        <br/>
        <input id='inputStatus'className="inputmsg2" type="text"ref={(node)=>status = node}/>
        <br/><br/>
        <input id="changeHl" className="btn" type="submit"
        value="Change Headline" onClick={(event) =>
                {event.preventDefault();
                changeHeadline(status, dispatch)}
                }/>
        <br/>
    </div>
)
}
//change the headline
const changeHeadline=(status,dispatch)=>{
   if(status.value != '') {
        resource('PUT', 'headline', { headline: status.value })
        .then((response) => {
            dispatch({type: 'UPDATE_HEADLINE', username: response.username, headline: response.headline})
        })
        status.value = ''
    }
}

export default connect(
    (state) => {
        return {
            user: state.user
        }
    },null
)(Headline)