const router = require("express").Router();

const db = require("../db");





router.post("/matching", async (req, res, next) => {
    const { agent_type_1, agent_type_2, agent_type_3 } = req.body
    console.log(agent_type_1);
    console.log(agent_type_2);
    console.log(agent_type_3);

    db.query(`CALL fetch_vacancy(?, ?, ?)` , [agent_type_1, agent_type_2, agent_type_3], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result[0]);
            var data = result[0].map(item => Object.assign({}, item))

            var data1 = data.filter(item => item.agency_type == agent_type_1)
            var data2 = data.filter(item => item.agency_type == agent_type_2)
            var data3 = data.filter(item => item.agency_type == agent_type_3)
console.log(data1)
            res.json({data1, data2, data3})
        }
    })
})


router.post("/matching/insert",async (req, res, next) => {
    const { agency_id, student_id, form_id } = req.body

    db.query(`CALL insert_placement(?, ?, ?)` , [student_id, agency_id, form_id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json({result})
        }
    })
})



router.post("/matching/student/:id", (req, res, next) => {
    db.query(`CALL fetch_placements(?)`, [req.params.id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            if(result.length > 0)
            res.json({result: result[0]})
            else
            res.json({result: null})
        }
    })
})


router.post("/matching/requirements", (req, res, next) => {
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

module.exports = router