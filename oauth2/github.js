const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
const User = require('../models/User')
require('dotenv').config()

const {GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env


passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/github/callback"
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            const { id, nodeId, displayName, username, profileUrl, provider } = profile
            const user = await User.findOne({ githubId: id })

            if (!user) {
                console.log('user yok kaydediliyor')
                const user = await User.create({
                    githubId: id,
                    github: {
                        id: id,
                        nodeId: nodeId,
                        dislpayName: displayName,
                        username: username,
                        profileUrl: profileUrl,
                        provider: provider
                    }
                })

            }
            console.log(`user var ${user?.github}`)
            console.log('----------------------------')
            console.log(`user giriş yapılıyor`)
            console.log('----------------------------')
            return done(null, user)


        } catch (err) {
            return done(err, false)
        }
    }))






passport.serializeUser(function (user, done) {
    done(null, user)
});

passport.deserializeUser(function (user, done) {
    done(null, user)
});