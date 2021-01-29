import React from 'react'
import { connect } from 'react-redux'
import { resource } from '../../actions'
//init the profile

export const initProfile = () => {
    return (dispatch) => {
        const user = {
            name: 'jj54'
        }
        const emailPromise = resource('GET', 'email')
        .then((response) => user.email = response.email)
        const zipcodePromise = resource('GET', 'zipcode')
        .then((response) => user.zipcode = response.zipcode)
        const dobPromise = resource('GET', 'dob')
        .then((response) => user.dob = new Date(response.dob).toLocaleDateString())
        const avatarPromise = resource('GET', 'avatars')
        .then((response) => user.avatar = response.avatars[0].avatar)
       Promise.all([emailPromise, zipcodePromise, dobPromise, avatarPromise]).then(() => {
            dispatch({type: 'INIT_PROFILE', newuser: user})
        })
    }
}
//update the profile
export const updateProfile = ({newuser}) => {
    return (dispatch) => {
        const emailPromise = resource('PUT', 'email', { email: newuser.email})
        const zipcodePromise = resource('PUT', 'zipcode', { zipcode: newuser.zipcode})
        const passwordPromise = resource('PUT', 'password', { password: newuser.password})
     Promise.all([emailPromise, zipcodePromise, passwordPromise]).then(() => {
            dispatch(initProfile())
        })
    }
}

export const updateImage = ({file})=>{

    return (dispatch) =>{
        const fd = new FormData()
        fd.append('image',file)
        resource('PUT','avatar',fd,false)
        .then((response)=>{
           dispatch({type:'UPDATE_AVATAR', avatar: response.avatar})
        })
        .catch(err=>{
            console.log(file)
            console.log(fd.get('image'))
        })
    }
}

export function disconnectFB() {
    return (dispatch) => {
    resource('POST', 'FB_disconnect').then((response) => {
        dispatch({type: 'IS_LINK_ERROR', errLinkInfo:'Sucess unlink!'})
    }).catch((err) => {
        console.log(err)
        dispatch({type: 'IS_LINK_ERROR', errLinkInfo:'Fail to unlink!'})
    })
    }
}

export function mergeFB({ originalUserName, originalPassword }) {
 return (dispatch) => {
    if (originalUserName && originalPassword) {
     //   console.log(originalUserName)
      //  console.log(originalPassword)
        resource('POST', 'FB_connect', { originalUserName, originalPassword })
                .then((response) => {
             //   console.log('2222')
                dispatch({type: 'IS_LINK_ERROR', errLinkInfo:`Sucess link with ${originalUserName}!`})
            }).catch((err) => {
               //  console.log('3333')
                dispatch({type: 'IS_LINK_ERROR', errLinkInfo:`Fail to link with ${originalUserName}!`})
                })
        }
    }
}



export function connectFB() {
    return (dispatch) => {
    window.top.location = 'https://back99.herokuapp.com/link/facebook'
    dispatch()
    }
}