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

var init = exec("git init", function (error, stdout, stderr) {
  if (error !== null) {
    console.log('git init error: ' + error);
  } else {
    // now pull the repo
    var pull = exec("git pull https://github.com/aaronfay/aaronfay-blog.git", function (error, stdout, stderr) {
      console.log('pulled .git repo');
      runServer();
    });
  }
});

function runServer() {
  Http.createServer(Stack(
    Creationix.log(),
    require('wheat')(process.env.JOYENT ? process.env.HOME + "/howtonode" : __dirname +"/..")
  )).listen(process.env.PORT || 5000);
}

