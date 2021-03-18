let http = require('http');
http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.write('{"messages":["aaa","bbb","ccc"]}'); //write a response to the client
    res.end(); //end the response
}).listen(8080); //the server object listens on port 8080