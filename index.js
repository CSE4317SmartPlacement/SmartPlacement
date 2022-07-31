const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const toSQLDate = require("js-date-to-sql-datetime");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname) + "/client/build"));
app.get("/client", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const db = require("./db");

const agencyRoute = require("./routes/agency_route");
app.use("/agency", agencyRoute);

app.post("/register", (req, res) => {
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

app.post("/login", (req, res) => {
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

app.post("/finduser", (req, res) => {
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

app.post("/changePassword", (req, res) => {
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

// Insert Student application
app.post("/studapplication", (req, res) => {
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
app.get("/studapplication", async (req, res, next) => {
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
app.get("/studapplication/:id", async (req, res, next) => {
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

// Insert Student application
app.post("/agency-student-request", (req, res) => {
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
app.get("/agency-student-request", async (req, res, next) => {
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
app.get("/agency-student-request/:id", async (req, res, next) => {
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

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
