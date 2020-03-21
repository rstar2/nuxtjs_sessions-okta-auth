/* eslint-disable consistent-return */
const path = require('path');
const { promisify } = require('util');

const consola = require('consola');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

// open database in memory
const db = new sqlite3.Database(
  path.resolve(process.cwd(), './db/auth.db'),
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      consola.error(err.message);
      process.exit(1);
    }
    consola.log('Connected to the in-memory SQlite database.');
  }
);

db.run('CREATE TABLE IF NOT EXISTS users(userEmail text NOT_NULL UNIQUE, userPassword text NOT_NULL)', (err) => {
  if (err) {
    consola.error(err.message);
    process.exit(1);
  }
  consola.log('Created "users" table');
});

// NOTE !!! The 'rowid' is the default 'auto-increment' row (if the table is created without WITHOUT ROWID option)
const SQL_GET_USER_BY_ID = 'SELECT rowid id, userEmail email FROM users WHERE rowid  = ?';
const SQL_GET_USER_BY_EMAIL = 'SELECT rowid id, userEmail email, userPassword password FROM users WHERE userEmail = ?';
const SQL_CREATE_USER = 'INSERT INTO users(userEmail, userPassword) VALUES(?, ?)';

/**
 * @param {Function} callback
 */
function close(callback) {
  // close the database connection
  db.close(callback);
}

/**
 * @param {String} userId
 * @param {Function} callback
 */
function get(userId, callback) {
  // single/first row only
  db.get(SQL_GET_USER_BY_ID, [userId], (err, row) => {
    if (err) return callback(err);
    if (!row) return callback(new Error(`No User found with the ID ${userId}`));

    callback(null, { id: row.id, email: row.email });
  });
}

/**
 * @param {String} userEmail
 * @param {String} userPassword
 * @param {Function} callback
 */
function login(userEmail, userPassword, callback) {
  // single row only
  db.get(SQL_GET_USER_BY_EMAIL, userEmail, (err, row) => {
    if (err) return callback(err);
    if (!row) return callback(new Error(`No User found with the email ${userEmail}`));

    const { password } = row;
    bcrypt.compare(userPassword, password, (err, res) => {
      if (err) return callback(err);
      if (!res) return callback(new Error(`Invalid Password for user with email ${userEmail}`));

      // all is OK
      callback(null, { id: row.id, email: row.email });
    });
  });
}

/**
 * @param {String} userEmail
 * @param {String} userPassword
 * @param {Function} callback
 */
function register(userEmail, userPassword, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return callback(err);
    }
    bcrypt.hash(userPassword, salt, (err, userPassHash) => {
      // Store hash in your password DB.
      if (err) {
        return callback(err);
      }

      // first row only
      db.run(SQL_CREATE_USER, [userEmail, userPassHash], function(err) {
        if (err) return callback(err);

        // NOTE!!! this.lastID is the newly inserted row's ID, so this function cannot be arrow-function
        callback(null, { id: this.lastID, email: userEmail });
      });
    });
  });
}

module.exports = {
  /**
   * @returns {Promise}
   */
  close: promisify(close),
  /**
   * @param {String} userEmail
   * @param {String} userPassword
   * @returns {Promise<{id: String, email: String}>}
   */
  register: promisify(register),
  /**
   * @param {String} userEmail
   * @param {String} userPassword
   * @returns {Promise<{id: String, email: String}>}
   */
  login: promisify(login),
  /**
   * @param {String} userId
   * @returns {Promise<{id: String, email: String}>}
   */
  get: promisify(get)
};
