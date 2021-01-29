
const Profile = require('./model').Profile
const uploadImage = require('../uploadCloudinary')
var mongoose = require('mongoose')

const getHeadline = (req, res) => {
//	console.log("getHeadline")
	const user = req.params.user 
	Profile.find({ username: user}).exec(function(err, profiles) {
		if(err) {
			throw err
		} else {
			const headline = profiles.map((v) => {
				return v.headline
			})
			console.log({ username:user, headline: headline })
			res.status(200).send({ username:user, headline: headline })
		}
	})
}

const putHeadline = (req, res) => {
	const username = req.username
	const headline = req.body.headline
	Profile.update({username: username}, {$set: {headline: headline}}, { new: true }, function(err, profiles){
		if (err){
			throw err
		} else {
			res.status(200).send({username:username, headline: headline})
		}
	})
}

const getEmail = (req, res) => {
	const username = req.params.user ? req.params.user : req.username
	Profile.find({ username:username }).exec(function(err, profiles){
		if(err) {
			throw err
		} else if(profiles === null || profiles.length === 0){
			res.status(400).send("no user "+username+" in database")
		} else {
			res.status(200).send({username:username, email:profiles[0].email})			
		}
	})
}

const putEmail = (req, res) => {
	const username = req.username
	const email = req.body.email
	Profile.update({username: username}, { $set: {email: email}}, {new: true}, function(err, profiles){
		if(err) {
			throw err
		} else {
			res.status(200).send({username:username, email:email})
		}
	})
}

const getZipcode = (req, res) => {
	const username = req.params.user ? req.params.user : req.username
	Profile.find({ username:username }).exec(function(err, profiles){
		if(err) {
			throw err
		} else if(profiles === null || profiles.length === 0){
			res.status(400).send("no user "+username+" in database")
		} else {
			res.status(200).send({username:username, zipcode:profiles[0].zipcode})			
		}
	})
}


const putZipcode = (req, res) => {
	const username = req.username
	const zipcode = req.body.zipcode
	Profile.update({username: username}, { $set: {zipcode: zipcode}}, {new: true}, function(err, profiles){
		if(err) {
			throw err
		} else {
			res.status(200).send({username:username, zipcode:zipcode})
		}
	})
}


const getDob = (req, res) =>{
	const username = req.username
	Profile.find({username:username}).exec(function(err, profiles){
		if(err) throw err
		else {
			res.status(200).send({username:username, dob:profiles[0].dob})			
		}
	})
}

const getAvatars = (req, res) => {
    const users = req.params.user ? req.params.user.split(',') : [req.username]
    Profile.find({username: {$in: users}}).exec(function(err, profiles){
		if(err) {
			throw err
		} else if(profiles === null || profiles.length === 0) {
    		res.status(400).send("no user "+username+" in database")
    	} else {
			const avatars = profiles.map((v) => {
				return { username: v.username, avatar: v.avatar }
			})
			res.status(200).send({ avatars: avatars })
		}
    })
}

const uploadAvatar = (req, res) => {
    Profile.update({username: req.username}, {$set: {avatar: req.fileurl}}, {new: true}, function(){})
    res.status(200).send({
        username: req.username,
        avatar: req.fileurl
    })
}

module.exports = app => {
     app.get('/headline/:user?', getHeadline)
     app.put('/headline', putHeadline)
     app.get('/email/:user', getEmail)
     app.put('/email', putEmail)
     app.get('/zipcode/:user', getZipcode)
     app.put('/zipcode', putZipcode)
	 app.get('/dob', getDob)
     app.get('/avatars/:user', getAvatars)
	 app.put('/avatar', uploadImage('avatar'), uploadAvatar)
}