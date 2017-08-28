const router = require( 'express' ).Router()
const User = require( '../db/User' )

router.post('/', (req, res, next) => {
  User.create(req.params.user)
  .then( createdUser => {
    req.login( createdUser, err => {
      if( err ) next( err )
      else res.status( 200 ).json( createdUser )
    })
  })
  .catch( next )
})
module.exports = router
