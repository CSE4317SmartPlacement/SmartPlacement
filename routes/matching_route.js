const router = require("express").Router();

const db = require("../db");

//Route for getting the agency based on 3 agency types
router.post("/matching", async (req, res, next) => {
    const { agent_type_1, agent_type_2, agent_type_3 } = req.body;
    db.query(`CALL fetch_vacancy(?, ?, ?)` , [agent_type_1, agent_type_2, agent_type_3], (err, result) => {
        if (err) {
            res.status(400).json({ success: false, error: err });
        } else {
            var data = result[0].map(item => Object.assign({}, item))
            var data1 = data.filter(item => item.agency_type == agent_type_1)
            var data2 = data.filter(item => item.agency_type == agent_type_2)
            var data3 = data.filter(item => item.agency_type == agent_type_3)
            res.json({data1, data2, data3})
        }
    })
})

//Inserting matching
router.post("/matching/insert",async (req, res, next) => {
    const { agency_id, student_id, form_id } = req.body
    db.query(`CALL insert_placement(?, ?, ?)` , [student_id, agency_id, form_id], (err, result) => {
        if (err) {
            res.status(400).json({ success: false, error: err });
        } else {
            res.json({result})
        }
    })
})


//Route for matching students using id
router.post("/matching/student/:id", (req, res, next) => {
    console.log("Sdfsdfsdrsd");
    db.query(`CALL fetch_placements(?)`, [req.params.id], (err, result) => {
            if (err) {
                res.status(400).json({ success: false, error: err });
            } else {
                res.send({result:result[0]});
            }
        })
    })

//Route for getting student requirements
router.post("/matching/requirements", (req, res, next) => {
    console.log(req.body.studentId);
    db.query(`CALL fetch_requirements(?)`, [req.body.studentId], (err, result)=> {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            if(result.length > 0)
            res.json({result: result[0]})
            else
            res.json({result: null})
        }
    })
})

//Route for getting the list of studetns working in a specific agency
router.post("/matchingstudent/studentlist", (req, res, next) => {
    const email = req.body.email;
    db.query(
      `CALL matching_studentlist(?)`, [email],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json({ data: results });
        }
      }
    );
  });
  

module.exports = router