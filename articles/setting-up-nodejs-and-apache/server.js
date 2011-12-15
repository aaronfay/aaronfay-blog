var httpProxy = require('http-proxy');

var options = { router: {
    'beta.mattapperson.com': 'beta.mattapperson.com:8080', //php script, so port 8080 for apache to deal with
    'blog.mattapperson.com': 'blog.mattapperson.com:9090', // a NodeJS script running on its own port
    'push.mattapperson.com': '199.19.116.195:8002',// a NodeJS script running on its own port
    'mattapperson.com': 'mattapperson.com:8080'//php script, so port 8080 for apache to deal with
}}

var proxyServer = httpProxy.createServer(options);
proxyServer.listen(80);// get all port 80 traffic to route to the correct location
