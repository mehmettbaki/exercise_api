const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')

const isloggedIn = require('./middleware')

require('./oauth2/github')

const connectdb = require('./db')

const { userRoute, productRoute, authRoute } = require('./routes')

require('dotenv').config()

connectdb()

const app = express()
app.use(helmet())
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
        cookie: {
            expires: 60000 //1 min
        }
    })
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(passport.initialize())
app.use(passport.session())


app.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback',
    passport.authenticate('github', { successRedirect: '/succes', failureRedirect: '/login' }))
app.get('/', (req, res) => {
    res.send('<a href="auth/github"> Auth with github<a>')
})

app.get('/succes',isloggedIn, (req, res) => {
    res.status(200).json('başarıyla login sağlandı')
})


app.get('/logout', function (req, res, next) {
    console.log('logout service çalıştı')
    console.log(req.user)

    req.logout(function (err) {
        console.log('req.logout sevice çalıştı')

        if (err) { return next(err); }
        req.session.destroy()
        res.redirect('/');
    });
});

// app.use('/', authRoute)
app.use('/', userRoute)
// app.use('/', productRoute)

app.get('/protected', isloggedIn, (req, res) => {
    res.status(200).json('protected route')
})

// custom 404
app.use((req, res, next) => {
    res.status(404).send("BULUNAMADI")
})

// custom error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('SERVER SIDE ERROR')
})

app.listen(process.env.PORT || 3000, () => {

    console.log(`Starting Express server on http://localhost:${PORT}`)
})