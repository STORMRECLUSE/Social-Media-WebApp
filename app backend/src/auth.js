
const cookieParser = require('cookie-parser') 
const md5 = require('md5')
const cookieKey = 'sid'

const User = require('./model').User
const Profile = require('./model').Profile

var redis = require('redis').createClient('redis://:pcfc8ec16a9801c78a6664f5b4050af659b7823dda699de8e33d72d43333fa96d@ec2-54-204-94-30.compute-1.amazonaws.com:20289')

const register = (req, res) => {
	const username = req.body.username
	console.log("username"+username)
	const password = req.body.password
	const displayname = req.body.displayname
	const email = req.body.email
	const dob = req.body.dob
	const zipcode = req.body.zipcode

	if(!username || !password){
		res.sendStatus(400)
		return
	}

	User.find({username: username}).exec( (error, users) => {
		if(users.length != 0) {
			res.status(401).send({result: 'This username already exists'})
			return
		}
		const salt = Math.random()
		const hash = md5(salt.toString() + password)
		const userObj = new User({
			username: username,
			salt: salt,
			hash: hash
		})
		const profileObj = new Profile({
			username: username,
			displayname: displayname,
			email: email,
			dob: dob,
			zipcode: zipcode,
			headline: 'Happy'
		})
		new User(userObj).save()
		new Profile(profileObj).save()
		res.send({username: username, salt: salt, hash: hash})
	})	
}

const isLoggedIn = (req, res, next) => {
	const sid = req.cookies[cookieKey]
	console.log("sid"+sid)
	if (!sid) {
		console.log(401)
		res.sendStatus(401)
		return
	}
	redis.hgetall(sid, function(err, userObj) {
		if (userObj) {
			req.username = userObj.username
			next()
		} else {
			// res.redirect('./login')
			res.sendStatus(401)
		}
	})
}

const isAuthorized = (req, obj) => {
	return obj.hash === md5(obj.salt.toString() + req.body.password)
}

const login = (req, res) => {
	const username = req.body.username
	const password = req.body.password
	console.log("user"+username)
	console.log("password"+password)
	if(!username || !password) {
		res.sendStatus(400)
		return
	}

	User.find({ username: username }).exec((error, users) => {
		if(users.length == 0) {
			res.status(401).send({result: 'No matched username'})
			return
		}
		const userTemp = users[0]
		const userObj = {}
		userObj.username = userTemp.username
		userObj.salt = userTemp.salt
		userObj.hash = userTemp.hash

	
		if(!userObj || !isAuthorized(req, userObj)) {
			res.status(401).send({result: 'Username and password do not match'})
			return
		}
		const sessionKey = md5('ricebookSecretMessage' + new Date().getTime() + userObj.username)
		console.log("sk"+sessionKey)
		redis.hmset(sessionKey, userObj)
		res.cookie(cookieKey, sessionKey, {MaxAge: 3600*1000, httpOnly: true })
		console.log({ username: username, result: 'success'})
		res.send({ username: username, result: 'success'})
	})
}

const putPassword = (req, res) => {
    
    if (req.body.password){
        User.find({username: req.username}).exec(function(error, users){
            if(error){
                res.status(500).send()
                return
            }
            User.update({username: req.username}, {$set: {hash: md5(users[0].salt.toString() + req.body.password)}}, function(err){
                if (err){
                    res.status(500).send()
                    return
                }
                res.send({username: users[0].username, status: 'success'})
            })
        })
    }
    else{
        res.status(400).send()
    }

}


// Function to logout
const logout = (req, res) => {
	console.log(logout)
	res.clearCookie(cookieKey)
	redis.del(req.cookies[cookieKey])
    res.status(200).send('OK')
}


module.exports = app => {
	app.use(cookieParser())
	app.post('/register', register)
	app.post('/login', login)
	app.use(isLoggedIn)
 	app.put('/logout', logout)
	app.put('/password', putPassword)
}
