var log4js = require('log4js');

log4js.configure(
   {
    "appenders":
        [
            {
                "type":"console",
                "category":"console"
            },
            {
                "category":"log_file",
                "type": "file",
                "filename": "node.log",
                "maxLogSize": 104800,
                "backups": 100
            }
        ],
    "replaceConsole": true,
    "levels":
    {
        "log_file":"ALL",
        "console":"ALL",
        "log_date":"ALL"
    }
});


var dateFileLog = log4js.getLogger('dateFileLog');
var logfile = log4js.getLogger('log_file');
exports.logger = logfile;

exports.use = function(app) {
    app.use(log4js.connectLogger(logfile, {level:'INFO', format:':method :url'}));
}