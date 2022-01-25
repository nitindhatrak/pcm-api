const express = require('express');
const sql = require('mssql');

const router = express.Router();

const config = {
    user: process.env.DB_USER || "sas",
    password: process.env.DB_PWD || "Sharepoint@1234",
    database: process.env.DB_NAME || "sharepoint-db",
    server: 'homefront-db.database.windows.net',                 
};

router.get('/', async (req, res) => {

    let q = req.query.q;
    console.log('Q>>>>');
    console.log(q);

    try {

        if (true) {

            sql.connect(config, function (err) {
    
                if (err) {
                    console.log(err);
                }
        
                var request = new sql.Request();

                request.query(`Select * from Lookup where LkpKey = '${q}'`, function (err, recordset) {

                    if (err) console.log(err);

                    res.send(recordset);
        
                });
            });
            //return res.status(200).json({success: true, msg: "Customer Data Added."});

        } else {
            return res.status(200).json({success: false, msg: "Warning: Empty Data !!"});
        }

    } catch (err) {

        console.log(err);

    }
});

// router.post('/add', async (req, res) => {

//     try {

//         let project = {};
//         const date = new Date();

//         project = req.body;

//         console.log('project details: ');
//         console.log(project);

//         if (true) {

//             sql.connect(config, function (err) {
    
//                 if (err) {
//                     console.log(err);
//                 }
        
//                 var request = new sql.Request();
                   
//                 request.query(`INSERT INTO Project (                        
//                     ProjectName,
//                     ProjectDesc,
//                     TotalAmt

//                 )
//                 VALUES
//                     (
//                         '${project.ProjectName}',
//                         '${project.ProjectDesc}',
//                         '${project.TotalAmt}'
//                     )`, function (err, recordset) {

//                     if (err) console.log(err)
        
//                 });
//             });

//             return res.status(200).json({success: true, msg: "Project Data Added.."});

//         } else {
//             return res.status(200).json({success: false, msg: "Warning: Empty Data !!"});
//         }

//     } catch (err) {

//         console.log(err);

//     }
// });


module.exports = router;

