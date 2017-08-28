/*-------- Dependency Import ------------*/
const path = require( 'path' );
const express = require( 'express' );
const volleyball = require( 'volleyball' )
const bodyParser = require( 'body-parser' );
const session = require( 'express-session' );
const passport = require( 'passport' );
const app = express();
const PORT = process.env.PORT || 3000;

/*-------- if in development, use local secrets for OAuth2 ------------*/
if ( process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing' ) {
  require('../localSecrets');
}

/*-------- Persistent Sequelize Session Store ------------*/
// This configures and creates db store
const db = require( '../db' )
const SequelizeStore = require( 'connect-session-sequelize' )( session.Store );
const dbStore = new SequelizeStore({ db });

/*-------- sync DB session store ------------*/
dbStore.sync()
.then( () => {
  console.log( 'dbStore synced' )
})
.catch( console.error.bind( console ) )

/*-------- Serialize User ------------*/
passport.serializeUser( ( user, done ) => {
  try {
    done( null, user.id );
  } catch ( err ) {
    done( err );
  }
});

/*-------- Deserialize User ------------*/
passport.deserializeUser( ( id, done ) => {
  User.findById(id)
    .then( user => done( null, user ) )
    .catch( done );
});

// logging middleware:
app.use( volleyball )

//static serving middleware
app.use( express.static( path.join( __dirname, '../client/public' ) ) )

//body parsing middleware
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

//session middleware
app.use( session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  store: dbStore,
  resave: false,
  saveUninitialized: false
}));

/*-------- Initialize and configure Passport ------------*/
app.use( passport.initialize() );
//must be used d/t using persistent sessions
//this must come after express.session
app.use( passport.session() );

//routes
app.use( '/auth', require( './auth' ) )
app.use( '/api', require( './api' ) )

//Error handling:
app.use( function ( req, res, next ) {
  const err = new Error( 'Not found.' );
  err.status = 404;
  next( err );
});

app.use( '/', ( err, req, res, next ) => {
  console.error( err );
  console.error( err.stack );
  res.status( err.status || 500 ).send( err.message || 'Internal Server error.' );
});

//database syncing
db.sync()
  .then( () => {
    app.listen(PORT, () => {
      console.log( 'Server listening on port: ', PORT );
    })
  })
  .catch(() => {
    throw new Error( 'oh no! db could not be synced' )
  })

//note to self --> what is this for?
app.get( '*', ( req, res, next ) => {
  res.sendFile( path.join( __dirname, '../client/public/index.html' ) );
});

module.exports = app;
