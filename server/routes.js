const router = require( 'express' ).Router();

/*-------- Router Imports ------------*/
const login = require( './login' )


router.use( 'login', login  )

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
