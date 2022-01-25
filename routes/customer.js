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

                request.query(`Select * from Customer`, function (err, recordset) {

                    if (err) console.log(err);

                    res.send(recordset);

                });
            });
            
        } else {
            return res.status(200).json({
                success: false,
                msg: "Warning: Empty Data !!"
            });
        }

    } catch (err) {

        console.log(err);

    }

});

router.post('/add', async (req, res) => {

    try {

        let customer = {};
        const date = new Date();

        console.log('Req body :');
        console.log(req.body);

        customer = req.body;

        console.log('customer details: ' + customer);
        console.log(customer);

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

                request.query(`INSERT INTO Customer (                        
                    CustomerName, CustomerAddress, CustomerCity, CustomerState, CustomerCountry
                )
                VALUES
                    (
                        '${customer.CustomerName}',
                        '${customer.CustomerAddress}',
                        '${customer.CustomerCity}',
                        '${customer.CustomerState}',
                        '${customer.CustomerCountry}' 
                    )`, function (err, recordset) {

                    if (err) console.log(err)

                });
            });

            return res.status(200).json({
                success: true,
                msg: "Customer Data Added."
            });

        } else {
            return res.status(200).json({
                success: false,
                msg: "Warning: Empty Data !!"
            });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "Error Occured"
        });

    }

});

router.put('/update', async (req, res) => {

    if (!req.body.CustomerID) {
        return res.status(400).json({
            success: false,
            msg: "Customer Id is missing"
        });
    }

    try {

        let customer = {};

        console.log('Req body :');
        console.log(req.body);

        customer = req.body;

        console.log('customer details: ' + customer);
        console.log(customer);

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

                request.query(`UPDATE Customer
                SET CustomerName = '${customer.CustomerName}', 
                CustomerAddress = '${customer.CustomerAddress}',
                CustomerCity = '${customer.CustomerCity}',
                CustomerState = '${customer.CustomerState}',
                CustomerCountry = '${customer.CustomerCountry}'

                WHERE CustomerID=${customer.CustomerID};`, function (err, recordset) {

                    if (err) console.log(err)

                });

            });

            return res.status(200).json({
                success: true,
                msg: "Customer Data Updated."
            });

        } else {
            return res.status(200).json({
                success: false,
                msg: "Warning: Empty Data !!"
            });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "Error Occured"
        });

    }
});


module.exports = router;