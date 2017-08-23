const router = require( 'express' ).Router();

/*-------- Router Imports ------------*/
const login = require( './login' )
const signup = require( './signup' )
const logout = require( './logout' )
const getMe = require( './getMe' )


router.use( 'login', login )
router.use( 'signup', signup )
router.use( 'logout', logout )
router.use( 'getMe', getMe )

//404 error
router.use( function ( req, res, next ) {
  const err = new Error( 'Not found.' );
  err.status = 404;
  next( err );
});

//Error Handler
router.use( '/', ( err, req, res, next ) => {
  console.error( err );
  console.error( err.stack );
  res.status( err.status || 500 ).send( err.message || 'Internal Server error.' );
});

module.exports = router
