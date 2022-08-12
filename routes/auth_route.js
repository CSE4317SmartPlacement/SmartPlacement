
const router = require("express").Router();

const db = require("../db");

//Route for registering
router.post("/register", (req, res) => {
    const username = req.body.username;
    const user_password = req.body.password;
    const access_lvl = req.body.accessLevel;
    const f_name = req.body.firstName;
    const l_name = req.body.lastName;
    
    db.query(
        "CALL add_account(?, ?, ?, ?, ?)",
        [username, user_password, access_lvl, f_name, l_name],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            } else {
                console.log(result);
                res.send(...result[0]);
            }
        }
    );
});

//Route for login
router.post("/login", (req, res) => {
    const username = req.body.username;
    const user_password = req.body.password;

    db.query(
        "CALL login_check(?, ?)",
        [username, user_password],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result[0]);
            } else {
                res.send({ message: "Wrong username/ password" });
            }
        }
    );
});

//Route for finding user using username
router.post("/finduser", (req, res) => {
    const username = req.body.username;
    console.log(username);

    db.query(
        "CALL find_user(?)",
        [username],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result[0]);
            } else {
                res.send({ message: "Wrong username" });
            }
        }
    );
});

//Route for changing password
router.post("/changePassword", (req, res) => {
    const username = req.body.username;
    const user_password = req.body.password;
    db.query(
        "CALL change_password(?, ?)",
        [user_password, username],
        (err, result) => {
            if (err) {
                console.log("did not work");
            }
            if (result.length > 0) {
                res.send(result[0]);
            } else {
                res.send({ message: "Wrong username" });
            }
        }
    );
});

module.exports = router;
