const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
//app.use(express.static(path.join(__dirname) + "/client/build"));
app.use(express.static(path.join(__dirname, '/client/build')));

/*
app.get("/client/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
*/
app.get('/client/*', function (req, res) {
   res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
 });
const agencyRoute = require("./routes/agency_route");
const authRoute = require("./routes/auth_route");
const studentRoute = require("./routes/student_route");
const agencyStudentRequestRoute = require("./routes/agency_student_request_route");

app.use("/agency", agencyRoute);
app.use("/", authRoute);
app.use("/studapplication", studentRoute);
app.use("/agency-student-request", agencyStudentRequestRoute)



app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
