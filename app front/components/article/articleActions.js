import { resource } from '../../actions'
import { initFollowing } from '../main/followingActions'
//init the articles part, clean the original exists articles
export const initArticles = () => {
    return (dispatch) => {
        dispatch({type: 'CLEAN'})
        resource('GET', 'articles')
        .then((response) => {
            dispatch({type: 'UPDATE_ARTICLES', articles: response.articles})
    })
        .catch((error) => console.log(error))
    }
}

//add a new article
export const addNewArticle = (text,file) => {
    if (text == '') return {type:''};
    const fd = new window.FormData()
    fd.append('text', text)
    fd.append('image', file)
    return (dispatch) => {
        resource('POST','article',fd,false)
        .then((response)=>{
            const article = response.articles[0]
            dispatch({type: 'ADD_ARTICLE',articles:article})
            dispatch(initArticles())
            dispatch(initFollowing())
        })
        .catch((error) => console.log(error))

    }
}

export const editArticle=(articleId, message, commentId)=>{
    return (dispatch) => {
        const payload = {text : message}
        if (commentId)
        payload.commentId = commentId
        resource('PUT', `articles/${articleId}`, payload)
        .then((response)=>{
            dispatch(initArticles())
            dispatch(initFollowing())
        })
    }
}

export const editComment=(articleId, message, commentId)=>{
    return (dispatch) => {
        const payload = {text : message}
        if (commentId)
        payload.commentId = commentId
        resource('PUT', `articles/${articleId}`, payload)
        resource('GET', 'articles')
        .then((response)=>{
            const article = response.articles
            dispatch({type:'UPDATE_ARTICLES',articles:response.articles})
        })
    }
}

export const updateArticle=(articleId, message, commentId)=>{
    return (dispatch) => {
        const payload = {text : message}
        if (commentId)
        payload.commentId = commentId
        resource('PUT', `articles/${articleId}`, payload)
         resource('GET', 'articles')
        .then((response) => {
            dispatch(initArticles())
            dispatch(initFollowing())
    })
    }
}