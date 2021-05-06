const Datastore = require("nedb");
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserDAO {
  constructor(dbFilePath) {
    if (dbFilePath) {
      //embedded
      this.db = new Datastore({ filename: dbFilePath, autoload: true });
    } else {
      //in memory
      this.db = new Datastore();
    }
  }

  // for the demo the password is the bcrypt of the user name
  init() {
    this.db.insert({
      user: 'Peter',
      password: '$2b$10$I82WRFuGghOMjtu3LLZW9OAMrmYOlMZjEEkh.vx.K2MM05iu5hY2C'
    });
    console.log('user record inserted in init');

    this.db.insert({
      user: 'Ann',
      password: '$2b$10$bnEYkqZM.MhEF/LycycymOeVwkQONq8kuAUGx6G5tF9UtUcaYDs3S'
    });


    console.log('user record inserted in init');
    return this;
  }

  create(username, password) {
    const that = this;
    bcrypt.hash(password, saltRounds).then((hash) => {
      const entry = {
        user: username,
        password: hash,
      };
      console.log('user entry is: ', entry);

      that.db.insert(entry, (err) => {
        if (err) {
          console.log("Can't insert user: ", username);
        }
      });
    });
  }

  lookup(user, callback) {
    this.db.find({'user': user}, function (err, entries) {
      if (err) {
        return callback(null, null);
      }
      return entries.length == 0 ? callback(null, null) : callback(null, entries[0])
    });
  }
}

const dao = new UserDAO();
dao.init();
module.exports = dao;