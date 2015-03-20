var express = require('express'),
    http = require('http');

var app = express();
app.disable('x-powered-by');

app.get('/', function (req, res) {
  res.send('Hello World');
})

var server = http.createServer(app);
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3300;
var host = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

server.listen(port, host, function() {
  console.log('panceta-api listening on', server.address());
});

process.on('SIGTERM', function() {
  console.log('SIGTERM received, try ordered shutdown');
  server.close(function() {
    process.exit(0);
  });
});
