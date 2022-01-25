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

    try {        

        if (true) {

            sql.connect(config, function (err) {
    
                if (err) {
                    console.log(err);
                }
        
                var request = new sql.Request();

                request.query(`Select * from Office`, function (err, recordset) {

                    if (err) console.log(err);

                    res.send(recordset);
        
                });
            });

        } else {
            return res.status(200).json({success: false, msg: "Warning: Empty Data !!"});
        }

    } catch (err) {

        console.log(err);

    }

});

router.post('/add', async (req, res) => {

    try {

        let office = {};
        const date = new Date();

        office = req.body.office;

        console.log('office details: ' + office);

        if (true) {

            sql.connect(config, function (err) {
    
                if (err) {
                    console.log(err);
                }
        
                var request = new sql.Request();
                   
                request.query(`INSERT INTO Office (OfficeName)
                VALUES ('${office.OfficeName}')`, function (err, recordset) {

                    if (err) console.log(err);

                    console.log(recordset);
        
                });
            });

            return res.status(200).json({success: true, msg: "Office Data Added."});

        } else {
            return res.status(200).json({success: false, msg: "Warning: Empty Data !!"});
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({success: false, msg: "Error Occured"});

    }

});


module.exports = router;

