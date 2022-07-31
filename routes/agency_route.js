const toSQLDate = require("js-date-to-sql-datetime");
const router = require("express").Router();

const db = require("../db");

//
router.post("/", (req, res) => {
  var formValue = req.body.formValue;
  var mailingAddress = req.body.mailingAddress;
  var businessAddress = req.body.businessAddress;

  db.query(
    `INSERT INTO sp_agency(agency_name,
      placement_type,
      agency_type,
      ein,
      website,
      graduation_level,
      phone,
      fax,
      email,
      bus_street,
      bus_unit,
      bus_city,
      bus_state,
      bus_zip,
      bus_country,
      mail_street,
      mail_unit,
      mail_city,
      mail_state,
      mail_zip,
      mail_country,
      agent_title,
      agent_fname,
      agent_lname,
      agent_phone,
      request_date,
      preferred_contacts) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
router.patch("/:id", async (req, res, next) => {
  const agencyId = req.params.id;
  const status = req.body.status;
  console.log(agencyId, status)
  db.query(
    `UPDATE sp_agency SET approval = ? WHERE agency_id = ?`,
    [status, agencyId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).json({ success: false, error: err });
      } else {
        console.log(result);
        res.status(200).json({ success: true, result: result });
      }
    }
  );
});

//Fetch all agency
router.get("/", async (req, res, next) => {
  db.query(`Select * from sp_agency`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({ success: false, error: err });
    } else {
      console.log(result);
      res.status(200).json({ success: true, result: result });
    }
  });
});

//Fetch agency by id
router.get("/agency/:id", async (req, res, next) => {
  db.query(
    `Select * from sp_agency where agency_id = ${req.params.id}`,
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
