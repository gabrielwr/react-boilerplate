# react-boilerplate
A quick, lightweight, starting point for full stack JavaScript applications using React, React-Redux, React-Router V3, Authentication, Sequelize V4, and Express with a Webpack Config.

## Table of Contents

* [Install](#install)
* [Server](#server)
* [Front-end](#front-end)
* [Database](#database)
* [Testing](#testing)
* [License](#license)

## Install

To install and locally run boilermaker, clone or download the project to your machine and run the following commands:

Install all project dependencies:
```bash
$ npm install
```
To start the server and have webpack build your bundle.js:
```bash
$ npm start
```

## Server
To start the server successfully, run
```bash
$ npm run start-dev
```
Because this boilerplate comes with an OAuth 2 login strategy for google, we will need to have access to the google secrets. In order to do so, we must run the start dev script because it sets our NODE_ENV variable to development -- meaning we successfully require in the google secrets file.

## Front-end
React components are hooked up to front end routing via React-Router V3. The routing logic lives in the index.jsx of the client folder.

Furthermore, the Root.jsx file in Components is the root renderer. It uses the children props provided in React to successfully render the correct component in accordance with React-Router. The Root.jsx file assumes that you will want a navbar and header for all views on the front end but this can easily be changed.

## Database
The database uses Sequelize as ORM for your PostgreSQL database. However, you may change the dialect in the `index.js` file to any supported dialect.

The `User.js` file is included to provide DB-side authentication and password salting/hashing functionality.

## Testing
The tests are written in the tests directory. To run tests, simply run
```bash
$ npm test
```
or
```bash
$ npm run test-watch
```
(the last command continuously watches changes to the tests and updates as tests are being written).

## License
MIT (c) Gabriel Rowe
