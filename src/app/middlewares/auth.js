const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader)
        return res.status(401).json({error: 'No token provided'})
        
    const parts = authHeader.split(' ')

    if(!parts.lenght === 2)
        return res.status(401).json({error: 'Token error'})

    const [ scheme, token ] = parts

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).json({error: 'Token malformatted'})

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err)
            return res.status(401).json({error: 'Invalid token!'})

        req.userId = decoded.userId
        return next()
    })

}