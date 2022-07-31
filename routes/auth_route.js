
const router = require("express").Router();

const db = require("../db");

router.post("/register", (req, res) => {
    const username = req.body.username;
    const user_password = req.body.password;
    const access_lvl = req.body.accessLevel;
    const f_name = req.body.firstName;
    const l_name = req.body.lastName;

    db.query(
        "INSERT INTO sp_user(username,user_password,access_lvl,f_name,l_name) VALUES (?,?,?,?,?)",
        [username, user_password, access_lvl, f_name, l_name],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            } else {
                res.send({ message: "Username already exists" });
            }
        }
    );
});

router.post("/login", (req, res) => {
    const username = req.body.username;
    const user_password = req.body.password;

    db.query(
        "SELECT * FROM sp_user WHERE username = ? AND user_password= ?",
        [username, user_password],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "Wrong username/ password" });
            }
        }
    );
});

router.post("/finduser", (req, res) => {
    const username = req.body.username;
    console.log(username);

    db.query(
        "SELECT * FROM sp_user WHERE username = ? ",
        [username],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result);
                console.log("anmol");
            } else {
                res.send({ message: "Wrong username" });
            }
        }
    );
});

router.post("/changePassword", (req, res) => {
    const username = req.body.username;
    const user_password = req.body.password;
    db.query(
        "UPDATE sp_user SET user_password=? WHERE username = ?",
        [user_password, username],
        (err, result) => {
            if (err) {
                console.log("did not work");
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "Wrong username" });
            }
        }
    );
});

module.exports = router;
