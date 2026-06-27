const { validateToken } = require("../services/authentication")

function checkForAuthenticationCookie(cookieName) {
    return function (req, res, next){
        
        if(!req.cookies) return next()

        const token = req.cookies[cookieName]
        if(!token) return next()

        try{
            const user = validateToken(token)
        }
        catch(err){
            console.log(err)
            return next()
        }

        if(!user) return next()

        req.user = user
        next()
    }
}

module.exports = { checkForAuthenticationCookie }