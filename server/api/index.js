const router = require( 'express' ).Router();

const users = require( './users' )

router.use( '/users', users );

router.use( ( req, res, next ) => {
  res.status( 404 ).send( 'Not found' );
});

module.exports = router;
