//require everything
const express = require("express")
const path = require("path")
const connectMongo = require("./connection")
const { checkForAuthenticationCookie } = require("./middleware/authentication")
const cookieParser = require("cookie-parser")
const UserRouter = require('./routes/user')
const BlogRouter = require('./routes/blog')

//setting constants
const app = express()
const PORT = 8002

//setting view engine
app.set('view engine', "ejs")
app.set('views', path.resolve('./views'))

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie('token'))

app.use('/', UserRouter)

app.listen(PORT, () => console.log(`server ga kita, PORT: ${PORT}`))