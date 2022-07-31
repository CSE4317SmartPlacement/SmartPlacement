const router = require("express").Router();

const db = require("../db");

// Insert Student application
router.post("/", (req, res) => {
    const formValue = req.body;

    preferred_contacts: [[Object], [Object], [Object], [Object]],
        db.query(
            `Insert into sp_agency_student_request(
                      agency_id,
                      number_of_vacancy,
                      graduation_level,
                      requirement,
                      immunization_record,
                      other_reports) 
        VALUES (?,?,?,?,?,?)`,
            [
                formValue.agency_id,
                formValue.number_of_vacancy,
                formValue.graduation_level,
                formValue.requirement,
                JSON.stringify(formValue.immunization_record),
                JSON.stringify(formValue.other_reports),
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
    db.query(`Select * from sp_agency_student_request`, (err, result) => {
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
        `Select * from sp_agency_student_request where id = ${req.params.id}`,
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

module.exports = router