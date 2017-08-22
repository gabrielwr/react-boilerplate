
const router = require( 'express' ).Router()

router.get('/me', (req, res, next) => {
  res.json(req.user);
});
