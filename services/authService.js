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

    generateTest(bfid, callback){
      let a=[
        body= string,
        flag= number
      ];
      let qna ={
        q = string,
        a
      };

      console.log("reached gentest");
      console.log(bfid);
      var sql = "SELECT qid, questions from test WHERE bfid = ?";
      var values = [bfid.bfid];
      db.query(sql, values, (err, questions) => {
          if (err) {
              callback(err);
          } else {
            //all questions retrieved
              console.log(questions[0].qid);

              qna.q.push(questions[0].questions);

              //getting options for each question
              var sql = "SELECT body,flag from options WHERE op_qid = ?";
              var values = [questions[0].qid];
              db.query(sql, values, (err, answers) => {
                  if (err) callback(err);

                  else{
                    qna.a.push(answers);
                    console.log(qna);
                  }
              })

              callback(null, questions);
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
