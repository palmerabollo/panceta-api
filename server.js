var express = require('express'),
    http = require('http');

var app = express();
app.disable('x-powered-by');

// There are some random grooveshark song ids
var SONGS = ["41886219", "7hPoPr", "26889869", "41414245", "41339801", "41487696"];

app.get('/ping', function (req, res) {
  res.json({pong: true});
});

app.post('/events', function (req, res) {
  // TODO magic goes here
  res.json({});
});

app.get('/next', function (req, res) {
  var song = SONGS[Math.floor(Math.random() * SONGS.length)];

  res.json({
    next: [song]
  });
});

app.get('*', function (req, res) {
  res.status(404).end();
});

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
