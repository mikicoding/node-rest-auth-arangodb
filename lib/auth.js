'use strict'

const { Strategy: StrategyJwt, ExtractJwt } = require('passport-jwt')
const config = require('./config')
const passport = require('passport')


const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: config.jwt_secret,
}

passport.use(new StrategyJwt(opts, (jwt_payload, done)=> {

  return (jwt_payload.expiration <= Date.now()) ? (
    done(null, false, {msg: 'Token expired.'})
  ) : (
    done(null, jwt_payload)
  )

}))

module.exports = {

  initialize: function() {
    return passport.initialize()
  },

  authenticate: function() {
    return passport.authenticate('jwt', { session: false})
  },

  getToken: function (headers) {

    if (headers && headers.authorization) {

      const parted = headers.authorization.split(' ')

      return (parted.length === 2) ? parted[1] : null

    }

    else {
      return null
    }

  }
}
