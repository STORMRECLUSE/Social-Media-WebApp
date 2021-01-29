import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {addArticle, updateArticle} from './articleActions'

export const NewComment = ({dispatch, articleId})=> {

    let message

    return (
        <li className="collection-item">
            <textarea id='commentarea'className="inputmsg" cols="100" rows='2'ref={node=>message=node}/>
            <br/>
            <button className="btn" onClick={()=>{
                    dispatch(updateArticle(articleId, message.value, -1))
                    document.getElementById('commentarea').value = ''
                }
                }>Input</button>
        </li>
    )
}




export default connect()(NewComment)