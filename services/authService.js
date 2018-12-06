const bcrypt = require('bcryptjs');

class AuthService {
    registerUser(user, callback) {
        this.isUsernameExist(user.username, (usernameExists) => {
            if (usernameExists) {
                callback("User already exists or problems accessing database");
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(user.std_password, salt, (err, hash) => {
                        if (err) {
                            callback(err);
                        }
                        user.std_password = hash;

                        var sql = "INSERT INTO student (username, std_password, percentage, background) VALUES (?, ?, ?, ?)";
                        var values = [user.username, user.std_password, user.percentage, user.background];

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

    setPreference(preference, callback){
        var sql = "SELECT bf_name from broaderfield where bf_id = ?";
        var values = [preference.preference];
        db.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
            } else {

                let temp = JSON.parse(JSON.stringify(result[0]));
                let temp1 = temp['bf_name'];
                var sql = "UPDATE student SET preference = ? WHERE username = ?";
                var values = [temp1, preference.name];
                db.query(sql, values, (err, result) => {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null);

                    }
                });

            }
        });
    }

    generateTest(data, callback){
      var sql = "SELECT bfid, test.qid, questions, CONCAT('[', GROUP_CONCAT(CONCAT('{\"body\":\"', body, '\", \"flag\":\"',flag,'\"}')), ']') as options FROM test JOIN options on test.qid = options.op_qid GROUP BY test.qid HAVING bfid = ?";   
      var values = [data.bfid];

      db.query(sql, values, (err, questions) => {
          if (err) {
              callback(err);
          } else {
              callback(null, questions);
          }
      });
    }

    getSuitableUniversities(data, callback){
        var sql = "SELECT DISTINCT cri_eligibility as eligibility, uni_Name as uni_name, uni_city, Link as uni_link FROM student, criteria JOIN university ON criteria.cri_uid = university.Uni_ID WHERE cri_eligibility <= ? && cri_bfid = ? ORDER BY cri_eligibility DESC";
        var values = [data.percentage, data.bfid];
  
        db.query(sql, values, (err, result) => {
            if (err) {
                callback(err);
            } else {
                callback(null, result);
            }
        });
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

            else{
              // console.log(result[0]);
              callback(null, JSON.parse(JSON.stringify(result[0])));
            }
        })
    }

    comparePassword(std_password, hash, callback) {

        bcrypt.compare(std_password, hash, (err, isMatched) => {
            if (err) {
                console.log(err);
            }

            callback(null, isMatched);
        });
    }

}

module.exports = AuthService;
