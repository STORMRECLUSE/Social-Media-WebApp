const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser') 
// if (process.env.NODE_ENV !== "production") {
//     require('dotenv').load()
// }


const corsMiddleware = (req, res, next) => {
 
    res.header('Access-Control-Allow-Origin',req.headers.origin)
    res.header('Access-Control-Allow-Credentials',true)
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers','Authorization, Content-Type')
    res.header('Access-Control-Expose-Headers', 'Location, X-Session-Id')
    if (req.method == 'OPTIONS')
    {
        res.sendStatus(200)
    }
    else{
        next()
    }
}

const app = express()
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(corsMiddleware)
require('./src/auth')(app)
require('./src/profile')(app)
require('./src/articles')(app)
require('./src/following')(app)
//require('./uploadCloudinary.js').setup(app)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3001
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})

