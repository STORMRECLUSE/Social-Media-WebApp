import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { editArticle,updateArticle, editComment } from './articleActions'
import NewComment from './newComment'

let newMessage
let newComm
let hideComment
var ContentEditable = require('react-contenteditable')
//the basic sturcture for each piece of article
export const Card = ({user,index,article, dispatcher}) => {
    newMessage=''
    newComm=''
    hideComment = true
    {return <tbody className="articlesCard">
        <tr>
            <td className="card3">
                <div className="note">{article.author} said on {article.date}</div>
                <ContentEditable
                                id='thisArticle'
                                html={article.text}
                                disabled={user.name != article.author}
                                onChange={(e)=>{newMessage = e.target.value}}
                            />
                <br/>
                <button type='button' className='btn' data-toggle='collapse'
                        data-target={'#collapseComments' + index}
                        onClick={()=>{}}>Comment({article.comments.length})</button>
             { user.name === article.author ?
               ( <button id='editBtn' type='button' className='btn'
                            onClick={()=>{
                                dispatcher(editArticle(article._id, newMessage,article.comments._id))
                                }
                            }>Edit&Save Article</button> )
                : ''
             }
                <br/><br/>
                 { article.comments.length >= 0 ? (
                <ul className='collapse' id={'collapseComments' + index}>
                        <NewComment articleId={article._id}/>
                        { article.comments.sort((x,y)=>{
                                    return x.date < y.date ? 1 : x.date > y.date ? -1 : 0;
                                }).map((comment, index) => {
                            return (
                                <div key={index} >
                                <b>{comment.author+':'}</b>
                                <li className="card4">
                                    <ContentEditable
                                        html={comment.text}
                                        disabled={user.name != comment.author}
                                        onChange=
                                        {(e)=>{newComm = e.target.value}}
                                    />
                                      { user.name === comment.author ?
                                            ( <button type='button' className='btn'
                                                onClick={()=>{
                                                    dispatcher(editComment(article._id, newComm, comment.commentId))
                                                    }
                                                }>Edit&Save Comment</button> ) : ''
                                      }
                                </li>
                                </div>
                            )
                        })}
                    </ul>
                ) : (
                null
            )}
            </td>
            {(typeof(article.img)=="undefined"||article.img === null||article.img==='') ? (
                <td className="card3">No img</td>
            ) : (
                <td className="card3"><img src={article.img}/></td>
            )}
        </tr>
    </tbody>
}
}

// this is the class get what we need from the state and build the basic structure for article with the info
export const ArticlesView = ({articlesFilt, dispatch,loginuser}) => {
    return(
            <div>
                <div className='card3'>
                    <input id="yourFeed"className="inputmsg" type="text"
                            placeholder="search you feed"
                            onChange={(event) => {dosearch(event, dispatch)
                            }
                            }/>
                </div>
                <div className='articlesView'  id='articlesList'>
                    <table>
                        {
                            articlesFilt.sort((a,b)=> {
                    return a.date < b.date ? 1 : a.date > b.date ? -1 : 0
                }).map((article, index, user,dispatcher) => {
                            return (
                                <Card key={index} article={article}
                                        index={index} user={loginuser} dispatcher={dispatch}/>
                            )
                            })
                        }
                    </table>
                </div>
            </div>
    )
}


//filter the article according to the input of the user
const dosearch = (event, dispatch) => {
    var keyWord = document.getElementById('yourFeed').value
    if(keyWord === ""||keyWord==null) {
        dispatch({type: 'RESUME_ARTICLES'})
    } else {
       dispatch({type: 'FILTER_ARTICLES', keyWord: keyWord})
    }

}
export default connect(
    (state) => {
        return {
            articlesFilt:state.articlesFilt,
            loginuser : state.user
        }
    }, null
)(ArticlesView)