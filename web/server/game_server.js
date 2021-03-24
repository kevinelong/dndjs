const Game = require("./game");
let game = new Game.Game();

let http = require('http');

//create a server object:
http.createServer(function (req, res) {
    let url = req.url;
    let parts = url.split('?');
    let command = "";
    if (parts.length > 1) {
        let params = parts[1].split('&');
        let keyValue = params[0].split("=");
        command = keyValue[1];
    }

    let output = game.play(command);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Content-Type', 'application/json');
    res.write(output); //write a response to the client
    res.end(); //end the response

}).listen(8080); //the server object listens on port 8080