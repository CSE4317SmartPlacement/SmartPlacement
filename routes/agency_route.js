const toSQLDate = require("js-date-to-sql-datetime");
const router = require("express").Router();

const db = require("../db");

//
router.post("/agencyadd", (req, res) => {
  var formValue = req.body.formValue;
  var mailingAddress = req.body.mailingAddress;
  var businessAddress = req.body.businessAddress;

  db.query(
    `CALL add_agency(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      formValue.agency_name,
      formValue.placement_type,
      formValue.agency_type,
      formValue.ein,
      formValue.website,
      JSON.stringify(formValue.graduation_level),
      formValue.phone,
      formValue.fax,
      formValue.email,
      businessAddress.street,
      businessAddress.unit,
      businessAddress.city,
      businessAddress.state,
      businessAddress.zip,
      "USA",
      mailingAddress.street,
      mailingAddress.unit,
      mailingAddress.city,
      mailingAddress.state,
      mailingAddress.zip,
      "USA",
      formValue.agent_title,
      formValue.agent_fname,
      formValue.agent_lname,
      formValue.agent_phone,
      toSQLDate(Date.now()),
      JSON.stringify(formValue.preferred_contacts),
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ err: "failed" });
      } else {
        res.send({ message: "successful" });
      }
    }
  );
});

// $PATCH :
router.patch("/agencyapproval/:id", async (req, res, next) => {
  const agencyId = req.params.id;
  const status = req.body.status;
  console.log(agencyId, status)
  db.query(
    `CALL agency_approval(?, ?)`,
    [status, agencyId],
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
//Fetch all agency
router.post("/agency", async (req, res, next) => {
  db.query(`CALL get_agency(?)`, [test], (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({ success: false, error: err });
    } else {
      console.log(result);
      res.status(200).json({ success: true, result: result[0] });
    }
  });
});

//Fetch agency by id
router.post("/agency/:id", async (req, res, next) => {
  db.query(
    `CALL get_agency(?)`, [req.params.id],
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
