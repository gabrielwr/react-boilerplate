const router = require( 'express' ).Router()
const User = require( '../db/User' )


router.use( '/', ( req, res, next ) => {
  User.findByEmail( req.params.email )
  .then( user => {
    if( !user ) {
      res.status( 401 ).send( 'User not found.' )
    } else if( user.hasMatchingPassword( req.params.password ) ){
      res.status( 401 ).send( 'Invalid Password' )
    } else {
      //using req.login from passport:
      req.login( user, ( err ) => {
        if( err ) next( err )
        else res.status( 204 ).json( user )
      })
    }
  })
  .catch(next)
})


