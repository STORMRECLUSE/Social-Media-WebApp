import { resource } from '../../actions'
import { initArticles } from '../article/articleActions'
// init the following
export const initFollowing = () => {
    return (dispatch) => {
        dispatch({type: 'CLEAN'})
        resource('GET', 'following')
        .then((response) => {
                response.following.map(function(user)  {
                dispatch(displayFollowing(user))
            })
        })
        .catch((error) => {
            console.log(error)
         } )
    }
}
//add a correct following
export const addFollowing = (name) => {
    return (dispatch,getState) => {
      const method='PUT'
      var flag=0;
      var i=0;
     for(i=0;i<getState().followerList.length;i++){
         if(getState().followerList[i].username==name){
             flag=1;
             break;
         }
    }
      if (method == 'PUT' &&flag==1 ){
            dispatch({type:'IS_UPDATE_ERROR',errUpdateInfo:`Already following ${name}`})
        }
        else{
        resource(method ? method : 'GET', 'following' + (name ? '/' + name : ''))
        .then((response) => {
            if(response.following.indexOf(name) < 0){
                dispatch({type:'IS_UPDATE_ERROR',errUpdateInfo:'Name is not exists!'})
            }
            else{
                dispatch(initFollowing())
                dispatch(initArticles())
            }
        })
         .catch((error) => {console.log(error)
            dispatch({type:'IS_UPDATE_ERROR', errUpdateInfo: `Name is not in database`})
        })
        }
    }
}
//remove a following
export const removeFollowing = (name) => {
    return (dispatch) => {
        resource('DELETE', 'following/' + name)
        .then((response) => {
            dispatch(initFollowing())
            dispatch(initArticles())
        })
    }
}
//show all the following
const displayFollowing = (name) => {
    return (dispatch) =>{
        const follower = {
            username: name
        }
        const avatarPromise = resource('GET', 'avatars/' + name)
        .then((response) => follower.avatar = response.avatars[0].avatar)
        const headlinePromise = resource('GET', 'headlines/' + name)
        .then((response) => follower.headline = response.headlines[0].headline)
        Promise.all([avatarPromise, headlinePromise] ).then(() => {
            dispatch({ type:'ADD_FOLLOWING', followerList: follower })
        })
    }
}

