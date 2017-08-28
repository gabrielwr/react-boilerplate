
const Sequelize = require( 'sequelize' )
const crypto = require('crypto');
const _ = require('lodash');

const db = require('./');

const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = user.Model.generateSalt();
    user.password = user.Model.encryptPassword(user.password, user.salt);
  }
};

module.exports = db.define('user', {
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
  },
  google_id: {
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
      return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
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
