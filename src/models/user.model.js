// src/models/user.model.js
// Here we would make DB queries

module.exports = {
  getOneByEmail(email) {
    // Send SELECT FROM user WHERE email = ?
    // Use prepared statement to replace ? with email
    console.log(email);
    throw new Error('Not implemented');
  },
};
