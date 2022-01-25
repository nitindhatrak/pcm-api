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

                request.query(`Select * from Employee`, function (err, recordset) {

                    if (err) console.log(err);

                    res.send(recordset);

                });
            });
            //return res.status(200).json({success: true, msg: "employee Data Added."});

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

        let employee = {};
        const date = new Date();

        employee = req.body;

        employee.EmployemntTypeLkpKey = employee.EmployemntTypeLkpKey === undefined ? 2 : employee.EmployemntTypeLkpKey;
        employee.OfficeLocationKey = employee.OfficeLocationKey === undefined ? 1 : employee.OfficeLocationKey;
        employee.ManagerKey = employee.ManagerKey === undefined ? 1 : employee.ManagerKey;

        console.log('employee details: ');
        console.log(employee);

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

                request.query(`INSERT INTO Employee (                        
                    EmployeeName, LoadedCost, VacationDays, EmployemntTypeLkpKey, OfficeLocationKey, ManagerKey
                )
                VALUES
                    (
                        '${employee.EmployeeName}',
                        '${employee.LoadedCost}',
                        '${employee.VacationDays}',
                        '${employee.EmployemntTypeLkpKey}',
                        '${employee.OfficeLocationKey}',
                        '${employee.ManagerKey}'
                    )`, function (err) {
                    if (err) console.log(err)
                });
            });

            return res.status(200).json({
                success: true,
                msg: "employee Data Added."
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

    if (!req.body.EmployeeID) {
        return res.status(400).json({
            success: false,
            msg: "Employee Id is missing"
        });
    }

    try {

        let employee = {};

        console.log('Req body :');
        console.log(req.body);

        employee = req.body;

        console.log('employee details: ' + employee);
        console.log(employee);

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

                request.query(`UPDATE Employee
                SET EmployeeName = '${employee.EmployeeName}', 
                LoadedCost = '${employee.LoadedCost}',
                VacationDays = '${employee.VacationDays}',
                EmploymentTypeLkpKey = '${employee.EmployemntTypeLkpKey}',
                OfficeLocationKey = '${employee.OfficeLocationKey}',
                ManagerKey = '${employee.ManagerKey}'

                WHERE EmployeeID=${employee.EmployeeID};`, function (err, recordset) {

                    if (err) console.log(err)

                });

            });

            return res.status(200).json({
                success: true,
                msg: "Employee Data Updated."
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