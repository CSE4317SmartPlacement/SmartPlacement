const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
//test
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)+"/client/build"));
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const agencyRoute = require("./routes/agency_route");
const authRoute = require("./routes/auth_route");
const studentRoute = require("./routes/student_route");
const agencyStudentRequestRoute = require("./routes/agency_student_request_route");
const matchingRoute = require("./routes/matching_route");

app.use("/", agencyRoute);
app.use("/", authRoute);
app.use("/", studentRoute);
app.use("/", agencyStudentRequestRoute);
app.use("/", matchingRoute)



app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
