
const Article = require('./model.js').Article
const Comment = require('./model.js').Comment
const Profile = require('./model.js').Profile
const md5 = require('md5')
const uploadImage = require('../uploadCloudinary')

const addArticle = (req, res) =>{
    if(!req.body.text){
        res.status(400).send('no content in this article')
		return
    }
    const newArticle = new Article({author: req.username, 
                                    img: req.fileurl, 
                                    date: new Date(), 
                                    text: req.body.text, 
                                    comments: []})
    new Article(newArticle).save(function(err, article){
        if(err) throw err
        else{
            console.log(article)
            res.send({articles: [article]})
        }
    })}


const getArticles = (req, res) => {

    console.log("getArticles")
	if(req.params.id){
		Article.find({_id: req.params.id}).exec(function(err,articles){
            if(err) {
                res.status(400).send('Bad Request')
            } else if (articles.length > 0){
                res.send({articles:[articles[0]]})
            } else{
                Article.find({author: req.params.id}).exec(function(err, articles){
                    if (err){
                        res.status(400).send('Bad Request')
                    } else {
                        res.send({articles: articles})
            }})}
        })
	} else {
		Profile.find({username:req.username}).exec(function(err,profiles){
        if (err || profiles.length == 0){
            res.status(500).send('Internal Server Error')
        } else {
            const userObj = profiles[0]
            const usersToQuery = [req.username, ...userObj.following]
            Article.find({ author: {$in: usersToQuery} }).sort('-date').limit(10).exec(function(err, articleItems) {
                return res.status(200).send({ articles: articleItems })
            })
        }})}
}

const editArticle = (req, res) => {
    Article.find({_id: req.params.id}).exec(function(err, articles) {
        // no such article with the id 
        if(err || articles.length == 0) {
            res.status(400).send('Bad Request')
            return
        } 
        // edit a comment
        if (req.body.commentId) {
            // add a new comment
            if (req.body.commentId == -1){
                const newcomment = new Comment({
                    commentId: md5(req.username + new Date().toUTCString()), 
                    author:req.username, 
                    date: (new Date()).toUTCString(), 
                    text: req.body.text
                })
                Article.findOneAndUpdate({_id: articles[0]._id}, { $addToSet: {comments: newcomment}}, {upsert:true, new:true}, function(err){
                    if (err){
                        res.status(500).send('Internal Server Error')
                    } else {
                        Article.find({_id: req.params.id}).exec(function(exception, articles){
                            res.send({articles: [articles[0]]})
                        })
                }})
            }
            // edit a comment
            else{
                Article.findOneAndUpdate({_id: articles[0]._id, 'comments.commentId' : req.body.commentId}, {$set: {'comments.$.text':req.body.text}}, function(ex, articles){
                if (ex) {
                    res.status(500).send('Internal Sever Error')
                    return
                } 
                res.send({articles: [articles[0]]})
            })}
        }
        //edit an article 
        else {
            Article.findOneAndUpdate({_id: articles[0]._id}, {$set: { text: req.body.text }}, function(err, articles){
                if (err){
                    res.status(500).send('Internal Server Error')
                    return
                } else {
                    res.send({articles: [articles[0]]})
                }
        })}
    })
}

module.exports = (app) => {
	app.get('/articles/:id*?', getArticles)
	app.post('/article', uploadImage('article'), addArticle)  
	app.put('/articles/:id', editArticle)
} 