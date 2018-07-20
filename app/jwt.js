'use strict'

const { JWT_SECRET } = process.env
const { Strategy, ExtractJwt } = require('passport-jwt')
const passport = require('passport')


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: JWT_SECRET,
}
const strategy = new Strategy(opts, (jwtPayload, done)=> {
    return jwtPayload.expiration <= Date.now()
    ? done(null, false, { msg:'Token expired' })
    : done(null, jwtPayload)
})
passport.use(strategy)


module.exports = {
    authenticate: passport.authenticate('jwt', { session:false, assignProperty:'jwt' }),
    initialize: ()=> passport.initialize(),
}
