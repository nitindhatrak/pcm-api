const express = require('express');
const app = express();

const sql = require('mssql');

cors = require('cors'),
bodyParser = require('body-parser');

app.use(cors())
app.use(bodyParser.json());


const timesheetRoute = require('./routes/timesheet');
const customerRoute = require('./routes/customer');
const projectRoute = require('./routes/project');
const expenseCodeRoute = require('./routes/expensecode');
const officeRoute = require('./routes/office');
const timecodeRoute = require('./routes/timecode');
const employeeRoute = require('./routes/employee');
const lookUpRoute = require('./routes/lookup');

app.get('/', function (req, res) {

    var config = {
        user: process.env.DB_USER || "sas",
        password: process.env.DB_PWD || "Sharepoint@1234",
        database: process.env.DB_NAME || "sharepoint-db",
        server: 'homefront-db.database.windows.net',                 
    };

    sql.connect(config, function (err) {
    
        if (err) {
            console.log(err);
        }

        var request = new sql.Request();
           
        request.query('select StartOfWeek, EndOfWeek from CalendarDates', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

// const sqlConfig = {
//     user: process.env.DB_USER || "sas",
//     password: process.env.DB_PWD || "Sharepoint@1234",
//     database: process.env.DB_NAME || "sharepoint-db",
//     server: 'homefront-db.database.windows.net',
//     pool: {
//       max: 10,
//       min: 0,
//       idleTimeoutMillis: 30000
//     },
//     options: {
//       encrypt: true, // for azure
//       trustServerCertificate: false // change to true for local dev / self-signed certs
//     }
// }

// async () => {
//     try {
//      // make sure that any items are correctly URL encoded in the connection string
//      await sql.connect(sqlConfig)
//      const result = await sql.query`select * from CalendarDates`
//      console.log('result')
//     } catch (err) {
//         console.log(err);
//     }
// }


app.use('/timesheet', timesheetRoute);
app.use('/customer', customerRoute);
app.use('/project', projectRoute);
app.use('/expense-code', expenseCodeRoute);
app.use('/office', officeRoute);
app.use('/employee', employeeRoute);
app.use('/timecode', timecodeRoute);
app.use('/lookup', lookUpRoute);





const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started and Listening on port ${port}`)); 