
const router = require( 'express' ).Router()

router.post('/logout', (req, res, next) => {
  req.logout();
  res.sendStatus(200);
});

module.exports = router
