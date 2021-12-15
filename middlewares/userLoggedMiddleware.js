const db = require("../src/database/models");
const User = db.User;

function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false

  if (req.session && req.session.userLogged) {
    res.locals.isLogged = true
    res.locals.userLogged = req.session.userLogged
    }
    
  let emailInCookie = req.cookies.userEmail
/* DataBase */
 User.findAll()
        .then(users => {
            let userFromCookie = users.find(i => i.email == emailInCookie)
            if (userFromCookie) {
                req.session.userLogged = userFromCookie
            }

            if (req.session.userLogged) {
                res.locals.isLogged = true
                res.locals.userLogged = req.session.userLogged
            }

        next()
    })
}

module.exports = userLoggedMiddleware