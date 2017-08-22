
const Sequelize = require( 'sequelize' )
const crypto = require('crypto');
const _ = require('lodash');

const db = require('./db');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  }
}, {
  hooks: {
    beforeCreate: setSaltAndPassword,
    beforeUpdate: setSaltAndPassword
  },
  instanceMethods: {
    sanitize: function() {
      return _.omit(this.toJSON(), ['password', 'salt']);
    },
    correctPassword: function() {
      return this.Model.encryptPassword(candidatePassword, this.getDataValue(salt)) === this.password;
    }
  },
  classMethods: {
    generateSalt: function() {
      return crypto.randomBytes(16).toString('base64');
    },
    encryptPassword: function() {
      const hash = crypto.createHash('sha1');
      hash.update(plainText);
      hash.update(salt);
      return hash.digest('hex');
    }
  }
});

function setSaltAndPassword (user) {
  // we need to salt and hash again when the user enters their password for the first time
  // and do it again whenever they change it
}

module.exports = User;
