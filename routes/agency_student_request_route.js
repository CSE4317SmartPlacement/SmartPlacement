const router = require("express").Router();

const db = require("../db");

// Insert Student application
router.post("/agency-student-requestadd", (req, res) => {
    const formValue = req.body;
    db.query(
        `CALL fetch_agency_ein(?)`, [formValue.ein],
        (err, result) => {
            console.log(formValue.ein);
            console.log(formValue.agency_id);
            if (err) {
                console.log(err);
                res.status(400).json({ success: false, error: err });
            } else {
                console.log(result)
                db.query(
                    `CALL agency_student_request(?,?,?,?,?,?)`,
                    [
                        result[0].agency_id,
                        formValue.ein,
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
            }
        }
    );



});

router.patch("/agency-student-requestapproval/:id", async (req, res, next) => {
    const Id = req.params.id;
    const status = req.body.status;
    console.log(Id, status)
    db.query(
      "CALL update_agency_stud_request(?, ?)",
      [status, Id],
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
router.post("/agency-student-request", async (req, res, next) => {
    db.query(`CALL fetch_agency_stud_request(?)`, [test], (err, result) => {
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
router.get("/agency-student-request/:id", async (req, res, next) => {
    db.query(
        `CALL fetch_agency_stud_request(?)`, [req.params.id],
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