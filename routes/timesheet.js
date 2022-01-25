const express = require("express");
const sql = require("mssql");

const router = express.Router();

//router.get('/:userId', async (req, res) => {
router.get("/", async (req, res) => {

    var config = {
        user: process.env.DB_USER || "sas",
        password: process.env.DB_PWD || "Sharepoint@1234",
        database: process.env.DB_NAME || "sharepoint-db",
        server: "homefront-db.database.windows.net",
    };
    sql.connect(config, function (err) {

        if (err) {
            console.log(err);
        }

        var request = new sql.Request();

        request.query(`Select * from TimeEntry`, function (err, recordset) {

            if (err) console.log(err);

            res.send(recordset);

        });
    });
	
});

router.post("/add", async (req, res) => {
	try {
		let timeEntryList = [];
		const date = new Date();
		console.log("adding");
		timeEntryList = req.body.timeEntryList;

		console.log(timeEntryList);


		var config = {
			user: process.env.DB_USER || "sas",
			password: process.env.DB_PWD || "Sharepoint@1234",
			database: process.env.DB_NAME || "sharepoint-db",
			server: "homefront-db.database.windows.net",
		};

		if (timeEntryList.length != 0) {
			console.log("Length is not zero !!");
            const item = timeEntryList[0]
			sql.connect(config, function (err) {
				if (err) {
					console.log("error", err);
				}

				var request = new sql.Request();
                request.query(`INSERT INTO TimeEntry (                        
                    TimeEntryDate, TimeHours, TimeDescription, Billable
                )
                VALUES
                    (
                        '${item.date}',
                        '${item.hours}',
                        '${item.description}',
                        '${item.billable}'
                    )`, function (err, recordset) {

                    if (err) console.log(err)

                });

			});

			return res
				.status(200)
				.json({ success: true, msg: "Timesheet Added" });
		} else {
			return res
				.status(200)
				.json({ success: false, msg: "Warning: Empty Data !!" });
		}
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
