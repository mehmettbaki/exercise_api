const isloggedIn = async (req, res, next) => {
    if (req.user) {
      console.log(`------------req.user--------`)
      console.log(req.user)
      console.log('----------------------------')
      
      return next();
    } else {
      console.log('No user object.')
    return res.status(401).json('no user logged in')
    }
  }


  module.exports = isloggedIn