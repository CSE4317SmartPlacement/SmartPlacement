const router = require("express").Router();

const db = require("../db");





router.post("/", async (req, res, next) => {
    const { agent_type_1, agent_type_2, agent_type_3 } = req.body

    db.query(`SELECT a.id, a.number_of_vacancy, b.agency_id, b.agency_type, b.agency_name, b.ein 
    FROM sp_database.sp_agency_student_request a, sp_database.sp_agency b
    WHERE a.number_of_vacancy > 0 and b.agency_id = a.agency_id and (b.agency_type = ? 
    or b.agency_type = ? or b.agency_type = ?)` , [agent_type_1, agent_type_2, agent_type_3], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            var data = result.map(item => Object.assign({}, item))

            var data1 = data.filter(item => item.agency_type == agent_type_1)
            var data2 = data.filter(item => item.agency_type == agent_type_2)
            var data3 = data.filter(item => item.agency_type == agent_type_3)
console.log(data1)
            res.json({data1, data2, data3})
        }
    })
})


router.post("/insert",async (req, res, next) => {
    const { agency_id, student_id, form_id } = req.body

    db.query(`INSERT INTO placement ( student_id, agency_id, form_id) VALUES (?, ?, ?)` , [student_id, agency_id, form_id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json({result})
        }
    })
})



router.get("/student/:id", (req, res, next) => {
    db.query(`SELECT * FROM sp_database.placement WHERE student_id = ?`, [req.params.id], (err, result) => {
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


router.post("/requirements", (req, res, next) => {
    db.query(`select * 
    from sp_database.sp_agency_student_request a, sp_database.placement b
    where a.id=b.form_id and b.student_id = ${req.body.studentId}`, (err, result)=> {
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