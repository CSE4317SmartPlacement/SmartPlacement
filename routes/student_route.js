const router = require("express").Router();

const db = require("../db");
// Insert Student application
router.post("/", (req, res) => {
    const formValue = req.body;

    preferred_contacts: [[Object], [Object], [Object], [Object]],
        db.query(
            `Insert into sp_student_application(
                      preferred_contacts,
                      stud_title,
                      stud_fname,
                      stud_lname,
                      stud_homephone,
                      stud_email,
                      stud_street,
                      stud_city,
                      stud_zipcode,
                      stud_country,
                      stud_id,
                      registered_level,
                      stud_mobilephone,
                      stud_unit,
                      stud_state,
                      agent_type_one,
                      agent_type_two,
                      agent_type_three) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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

//Fetch all student applciations
router.get("/", async (req, res, next) => {
    db.query(`Select * from sp_student_application`, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).json({ success: false, error: err });
        } else {
            console.log(result);
            res.status(200).json({ success: true, result: result });
        }
    });
});

//Fetch student applciation by id
router.get("/:id", async (req, res, next) => {
    db.query(
        `Select * from sp_student_application where stud_id = ${req.params.id}`,
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

module.exports = router;
