
/*-------- Router Imports ------------*/
const router = require('express').Router();
const User = require('../../db/user');
const google = require('./google')

router.post('/login', (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user)
        res.status(401).send('User not found');
      else if (!user.correctPassword(req.body.password))
        res.status(401).send('Incorrect password');
      else
        req.login(user, err => err ? next(err) : res.json(user));
    })
    .catch(next);
})

router.post('/signup', ( req, res, next ) => {
  User.create(req.body)
    .then(user =>
      req.login( user, err => err ? next( err ) : res.json( user ) ))
    .catch(err => {
      if ( err.name === 'SequelizeUniqueConstraintError' )
        res.status(401).send( 'User already exists' );
      else next( err );
    });
})

router.post( '/logout', ( req, res, next ) => {
  req.logout();
  res.redirect( '/' );
})

router.get( '/me', ( req, res, next ) => {
  res.json( req.user );
})

router.use( '/google', google );

module.exports = router
