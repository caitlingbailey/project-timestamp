// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/api", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});


app.get("/api/:date", function(req, res) {
  let date = req.params.date;

  if (/\d{5,}/.test(date)) {
    dateInt = parseInt(date);
    res.json({"unix": dateInt, "utc": new Date(dateInt).toUTCString()});
  };

  let date_test = new Date(date);

  if (date_test.toString() == "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: date_test.valueOf(), utc: date_test.toUTCString() });
    }
});