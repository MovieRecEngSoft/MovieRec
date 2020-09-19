const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const UserService = require('./services/UserService')

passport.use(new LocalStrategy(async (username, password, done) => {
    try{
        let user = await UserService.findOne({name: username})
        if (!user || !UserService.validadatePassword(user, password)) {
            return done(null, false)
        }
        return done(null, user)
    }
    catch(error){
        return done(error)
    }
}))

passport.serializeUser((user, done) =>{
    done(null, user._id)
})

passport.deserializeUser(async (id, done) =>{
    let user = await UserService.findById(id)
    done(null, user)
})

module.exports = passport
