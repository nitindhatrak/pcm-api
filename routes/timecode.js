const express = require('express');
const sql = require('mssql');

const router = express.Router();


router.get('/', async (req, res) => {

    try {

        var config = {
            user: process.env.DB_USER || "sas",
            password: process.env.DB_PWD || "Sharepoint@1234",
            database: process.env.DB_NAME || "sharepoint-db",
            server: 'homefront-db.database.windows.net',                 
        };

        if (true) {

            sql.connect(config, function (err) {
    
                if (err) {
                    console.log(err);
                }
        
                var request = new sql.Request();

                request.query(`Select * from TimeCodes`, function (err, recordset) {

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

router.post('/add', async (req, res) => {

    try {

        let timecode = {};
        const date = new Date();

        timecode = req.body.timecode;

        console.log('details: ' + timecode);

        var config = {
            user: process.env.DB_USER || "sas",
            password: process.env.DB_PWD || "Sharepoint@1234",
            database: process.env.DB_NAME || "sharepoint-db",
            server: 'homefront-db.database.windows.net',                 
        };

        if (true) {

            sql.connect(config, function (err) {
    
                if (err) {
                    console.log(err);
                }
        
                var request = new sql.Request();
                   
                request.query(`INSERT INTO TimeCode (                        
                    Name
                )
                VALUES
                    (
                        '001'
                    )`, function (err, recordset) {

                    if (err) console.log(err)
        
                });
            });

            return res.status(200).json({success: true, msg: "Timecode Data Added."});

        } else {
            return res.status(200).json({success: false, msg: "Warning: Empty Data !!"});
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({success: false, msg: "Error Occured"});

    }

});


module.exports = router;

