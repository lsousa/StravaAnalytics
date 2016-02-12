var express = require('express');
var levelup = require('levelup');
var strava = require('strava-v3');


var db = levelup('./sa_db');

var app = express();


app.get('/', function (req, res) {
    var _res = res;

    var activities = new Promise (
        function (resolve, reject) {
            strava.athlete.listActivities({per_page:1},function(err, res) {
                if (err)
                    reject(err);
                resolve(res);
            });
        }
    );

    activities.then( function(activities) {
        //process activities
        _res.send(activities);
    })
    .catch( function(error) {
        _res.send(error);
    });

});

app.get('/promises', function (req, res) {
    var _res = res;
    var p1 = new Promise (
        function (resolve, reject) {
            resolve('hello world');
        }
    );

    p1.then( function(val) {
        _res.send(val);
    });

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});