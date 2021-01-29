import React from 'react'
import { connect } from 'react-redux'
import { addFollowing, removeFollowing } from './followingActions'

// this is the basic structure for user's info
const User = ({user, dispatch}) => {
    return(
    <div className='followersCard'>
        <br/>
        <img src={user.avatar} />
        <div className='followerName'>{user.username}</div>
        <div><b>{user.headline}</b></div>
        <button className='btn removeBtn'
            onClick={() => removefollower({dispatch, username: user.username})}>Unfollow</button>
        <br/>
        <br/>
        <br/>
    </div>
    )
}
// this is the class get what we need from the state and
//build the basic structure for followers with the info
const Following  = ({errUpdateInfo,followerList, dispatch}) => {
    return (
            <div>
                <h3> Following Users </h3>
                <div id='followerList'>
                    {
                        followerList.map((user,index) => {
                            return (
                                <User  key={index} user={user} dispatch={dispatch}/>
                            )
                        })
                    }
                </div>
                <div>
                    <input id='addFollowing' type='text' className="inputmsg2"
                        placeholder='Name' /><br/>
                    <button id='followerBtn' className='btn'
                        onClick={() =>
                            addfollower(dispatch)}> Add New Follewer</button>
                </div>
                 <div className="alertmsg">{errUpdateInfo}</div>
            </div>
        )
}
// add a follower by changing the state
const addfollower = (dispatch) => {
    var name = document.getElementById('addFollowing').value
    if(name===''){
        dispatch({type:'IS_UPDATE_ERROR',errUpdateInfo:'Please enter the name!'})
    }
    else{
        dispatch({type:'IS_UPDATE_ERROR',errUpdateInfo:''})
        dispatch(addFollowing(name))
        document.getElementById('addFollowing').value = ''
    }
}
//remove a follower by changing the state
const removefollower = ({dispatch,username}) => {
    dispatch(removeFollowing(username))
}

export default connect(
    (state) => {
        return {
            errUpdateInfo:state.errUpdateInfo,
            followerList: state.followerList
        }
    }, null)(Following)