import React from 'react'
import {connect} from 'react-redux'
import { addNewArticle } from './articleActions'

//Add a new article which the contents are from the textarea.
const NewArticle = ({user,dispatch}) => {
    let newArticleImage
    let newArticleText
    const  handleImageChange=(event)=>{
        event.preventDefault()
        newArticleImage = event.target.files[0]
    }
    return(
        <div className='card3'>
            Type a new Article....<br/><br/>
            <textarea className="inputmsg" cols="40" rows='8' id='newArticle'
                                            ref={(node)=>newArticleText = node}
                                            placeholder='Share something interesting!'/>
            <br/><br/>
            Select Picture:
             <input type="file" className='btn' id='uploadimg' accept="image/*"
                                onChange={(e) => handleImageChange(e)}/>
            <br/><br/>
             <button type='button' className='btn' id='postBtn'
                                onClick={()=>{dispatch(addNewArticle(newArticleText.value, newArticleImage))
                                newArticleText.value = ''
                                newArticleImage = '' }}>Post</button>
            <button type='button' className='btn' onClick={() => {
                 document.getElementById('newArticle').value = ''
                 newArticleImage=null}
            }>Clear</button>
        </div>
    )
}

export default connect(
    (state) => {
        return {
            user : state.user
        }
    }, null
)(NewArticle)