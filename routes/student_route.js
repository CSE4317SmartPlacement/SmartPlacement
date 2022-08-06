const router = require("express").Router();

const db = require("../db");
// Insert Student application
router.post("/studapplicationadd", (req, res) => {
    const formValue = req.body;

    preferred_contacts: [[Object], [Object], [Object], [Object]],
        db.query(
            `CALL student_application(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                JSON.stringify(formValue.preferred_contacts),
                formValue.stud_title,
                formValue.stud_fname,
                formValue.stud_lname,
                formValue.stud_homephone,
                formValue.stud_email,
                formValue.stud_street,
                formValue.stud_city,
                formValue.stud_zipcode,
                formValue.stud_country,
                formValue.stud_id,
                formValue.registered_level,
                formValue.stud_mobilephone,
                formValue.stud_unit,
                formValue.stud_state,
                formValue.agent_type_one,
                formValue.agent_type_two,
                formValue.agent_type_three,
            ],
            (error, result) => {
                if (error) {
                    console.log(error);
                    res.status(400).json({ success: false, error });
                } else {
                    console.log(result);
                    res.status(200).json({ success: true, result });
                }
            }
        );
});

// $PATCH :
router.patch("/studapplicationapproval/:id", async (req, res, next) => {
    const studentId = req.params.id;
    const status = req.body.status;
    console.log(studentId, status)
    db.query(
        `CALL student_approval(?, ?)`,
        [status, studentId],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(400).json({ success: false, error: err });
            } else {
                console.log(result);
                res.status(200).json({ success: true, result: result[0] });
            }
        }
    );
});

const test = '%';
//Fetch all student applciations
router.post("/studapplication", async (req, res, next) => {
    db.query(`CALL fetch_studapplications(?)`, [test], 
    (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).json({ success: false, error: err });
        } else {
            console.log(result);
            res.status(200).json({ success: true, result: result[0] });
        }
    });
});

//Fetch student applciation by id
router.post("/studapplication/:id", async (req, res, next) => {
    db.query(
        `CALL fetch_studapplications(?)`, [req.params.id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(400).json({ success: false, error: err });
            } else {
                console.log(result);
                res.status(200).json({ success: true, result: result[0] });
            }
        }
    );
});

// Matching Student with Agency


module.exports = router;
