var express = require('express');
var router = express.Router();


/* GET analytics page. */
router.get('/', function(req, res, next) {
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

router.get('/test', function(req, res, next) {
    req.strava.athlete.get({},function(err,payload) {
        if(!err) {
            res.send(payload);
        }
        else {
            res.send(err);
        }
    });
});

module.exports = router;
