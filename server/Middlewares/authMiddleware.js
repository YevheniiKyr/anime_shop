const jwt = require('jsonwebtoken')


module.exports = function (req,res,next) {

    if(req.method === "OPTIONS"){
        next()
    }
    try{

        const token = req.headers.authorization.split(' ')[1]

        if(!token){
            res.status(401).json({msg :"don't authorized"})
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded

        console.log("VERIFIED USER " + decoded._id + ' ' + decoded.email + ' ' +  decoded.role)
        next()

    } catch (e){
        res.status(401).json({msg :"don't authorized"})
    }
}