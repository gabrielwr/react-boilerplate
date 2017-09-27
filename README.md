# react-boilerplate
Quick, lightweight, starting point for full stack JavaScript applications using React, React-Redux, React-Router V3, Authentication, Sequelize V4, and Express with a Webpack Config.

# Starting the server
To start the server successfully, run `npm run start-dev`. Because this boilerplate comes with an OAuth 2 login strategy for google, we will need to have access to the google secrets. In order to do so, we must run the start dev script because it sets our NODE_ENV variable to development -- meaning we successfully require in the google secrets file.

# Front end architecture
React components are hooked up to front end routing via React-Router V3. The routing logic lives in the index.jsx of the client folder.

Furthermore, the Root.jsx file in Components is the root renderer. It uses the children props provided in React to successfully render the correct component in accordance with React-Router. The Root.jsx file assumes that you will want a navbar and header for all views on the front end but this can easily be changed.

# Database
The database uses Sequelize as ORM for your PostgreSQL database. However, you may change the dialect in the `index.js` file to any supported dialect.

The `User.js` file is included to provide DB-side authentication and password salting/hashing functionality.

# Testing
The tests are written in the tests directory. To run tests, simply run `npm test` or `npm run test-watch` (the last command continuously watches changes to the tests and updates as tests are being written).
