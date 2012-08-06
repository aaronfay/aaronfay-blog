// Just a basic server setup for this site
var Stack = require('stack'),
    Creationix = require('creationix'),
    Http = require('http'),
    fs = require('fs'),
  exec = require('child_process').exec;
  
  
var child;

setInterval(function() {
  // executes `pwd`
  child = exec("git pull", function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
}, 1800000);

Http.createServer(Stack(
  Creationix.log(),
  require('wheat')(process.env.JOYENT ? process.env.HOME + "/howtonode" : __dirname +"/..")
)).listen(process.env.PORT || 5000);

