const bcrypt = require('bcryptjs');

class AuthService {
    registerUser(user, callback) {
        this.isUsernameExist(user.username, (usernameExists) => {
            if (usernameExists) {
                callback("User already exists or problems accessing database");
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(user.password, salt, (err, hash) => {
                        if (err) {
                            callback(err);
                        }
                        user.password = hash;

                        var sql = "INSERT INTO student (username, std_password, percentage, background) VALUES (?, ?, ?, ?)";
                        var values = [user.username, user.password, user.percentage, user.background];

                        db.query(sql, values, (err, result) => {
                            if (err) {
                                callback(err);
                            } else {
                                callback(null);
                            }
                        });
                    })
                });
            }
        })
    }

    isUsernameExist(username, callback) {
        var sql = "SELECT * FROM student WHERE username = ?";
        db.query(sql, [username], (err, result) => {
            callback(err || result.length != 0); // Return true DB returned error or result not empty
        });
    }

    getUserByUsername(username, callback) {
        var sql = "SELECT * FROM student WHERE username = ?";
        db.query(sql, [username], (err, result) => {
            if (err) callback(err);

            callback(null, JSON.parse(JSON.stringify(result[0])));
        })
    }

    comparePassword(password, hash, callback) {
        
        bcrypt.compare(password, hash, (err, isMatched) => {
            if (err) {
                console.log(err);
            }

            callback(null, isMatched);
        });
    }
}

module.exports = AuthService;
