
const Profile = require('./model').Profile
var mongoose = require('mongoose')

const getFollowing = (req, res) =>{
    const username = req.params.user ? req.params.user : req.username
    Profile.find({ username:username }).exec(function(err, profiles){
        if(err) {
            console.log('!!' + err)
            return
        } else if(profiles !== null && profiles.length !== 0){
            res.status(200).send({username:username, following: profiles[0].following})           
        }
    })
}

const putFollowing = (req, res) =>{
    const following = req.params.user
    const loggedinUser = req.username
    if(!following) {
        console.log('!!!')
        res.status(400).send('Put following error')
    } else {
        Profile.find({ username:following }).exec(function(err, profiles){
            if(profiles === null || profiles.length === 0) {
                res.send({msg: 'invalid user'})
                return
                // res.status(400).send('Please enter valid username to follow')
            } else {
                Profile.findOneAndUpdate({username: loggedinUser}, { $addToSet: {following: following}}, {upsert:true, new:true}, function(err, profile){})
                Profile.find({username: loggedinUser}).exec(function(err, profiles){
                    res.status(200).send({username: loggedinUser, following: profiles[0].following})
                })
        }})
    }
}

const deleteFollowing = (req, res)=>{
    const following = req.params.user
    const loggedinUser = req.username
    Profile.findOneAndUpdate({username: loggedinUser}, { $pull: {following: following}}, {new:true}, function(err, profile){})
    Profile.find({username: loggedinUser}).exec(function(err, profiles){
        res.status(200).send({username: loggedinUser, following: profiles[0].following})
    })
}

module.exports = (app) => {
    app.delete('/following/:user', deleteFollowing)
    app.put('/following/:user', putFollowing)
    app.get('/following/:user?', getFollowing)  
}