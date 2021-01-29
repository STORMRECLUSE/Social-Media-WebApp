import React from 'react'
import NewArticle from './newArticle'
import ArticlesView from './articlesView'

//Basic structure of article module
const Article = (props) => {
    return(
        <div>
            <NewArticle/>
            <br/><br/>
            <ArticlesView articles=
            	{require('../../data/articles.json').articles} />
        </div>
    )
}

export default Article