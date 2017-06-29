const path = require('path');
const express = require('express');
const volleyball = require('volleyball')
const routes = require('./routes.js')
const bodyParser = require('body-parser');


const app = express();

// you'll of course want static middleware so your browser can request things like your 'bundle.js'
app.use(express.static(path.join(__dirname, '../client/public')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// middleware:
app.use(volleyball)

//routes:
app.use('/api', routes)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server listening on port: ', PORT);
})

// Make sure this is right at the end of your server logic!
// The only thing after this might be a piece of middleware to serve up 500 errors for server problems
// (However, if you have middleware to serve up 404s, that go would before this as well)
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});
