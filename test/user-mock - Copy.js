var UserMock = function () {

    var uuid = require('node-uuid'),
        crypto = require('crypto'),
        User = require('../models/user.js'),
        UserProfileModel = require('../models/user-profile.js'),
        ApiResponse = require('../models/api-response.js'),
        ApiMessages = require('../models/api-messages.js'),
        seedUsersCount = 10,
        users = [],
        me = this;

    me.err = false,
    me.numberAffected = 0;

    var setError = function (err) {
        me.err = err;
    };

    var setNumberAffected = function (number) {
        me.numberAffected = number;
    }

    var seedUsers = function () {
        for (var i = 0; i < seedUsersCount; i++) {

            var passwordSaltIn = uuid.v4(),
                cryptoIterations = 10000, // Must match iterations used in controller#hashPassword.
                cryptoKeyLen = 64,       // Must match keyLen used in controller#hashPassword.
                passwordHashIn;

            user = new User({
                email: 'Test' + i + '@test.com',
                firstName: 'FirstName' + i,
                lastName: 'LastName' + i,
                passwordHash: crypto.pbkdf2Sync('Password' + i, passwordSaltIn, cryptoIterations, cryptoKeyLen),
                passwordSalt: passwordSaltIn
            });

            users.push(user);
        }
    };

    var getTestUser = function () {
        return users ? users[0] : null;
    }

    var find = function (callback) {

        return callback(me.err, users);
    };

    var findById = function (id, callback) {
        
        for (var i = 0, length = users.length; i < length; i++) {

            if (users[i]._id === id) {
                return callback(me.err, users[i]);
            }
        }        

        return callback(me.err, null);
    };

    var findOne = function (where, callback) {

        for (var i = 0, length = users.length; i < length; i++) {
            
            if (users[i].email === where.email) {
                return callback(me.err, users[i]);
            }
        }

        return callback(me.err, null);
    };

    var save = function (callback) {
        return callback(me.err, me, me.numberAffected);
    };

    var update = function (conditions, update, callback) {
        return callback(me.err, me.numberAffected);
    }

    return {
        find: find,
        findById: findById,
        findOne: findOne,
        save: save,
        update: update,
        seedUsers: seedUsers,
        setError: setError,
        getTestUser: getTestUser,
        setNumberAffected: setNumberAffected
    }
};

module.exports = UserMock;
