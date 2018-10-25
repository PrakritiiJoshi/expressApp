
var fs = require('fs');

var data = fs.readFileSync('colors.json');

var colors = JSON.parse(data);
console.log('colors');

console.log("server is starting");

var express = require('express');

var app = express();

var server = app.listen(3000, listening);

function listening(){
    console.log("listening")
}


app.get('/add/:color/:logo', addColor);
function addColor(request, response){
  var data = request.params; //word and score are parameters
    var word = data.word; 
    var logo = Number(data.logo);
    colors[word] = logo;
    var data = JSON.stringify(colors); 
    fs.writeFile('colors.json', data, finished);
        function finished(err) {
            console.log('got the word')
        } 
    var reply = {
        msg: "Thank you for your color."
    }
  response.send(reply)
}
   
app.get('/all', sendAll);

function sendAll(request, response){
    response.send(colors);
}
  


app.get('/search/:word/', find);

function find(request, response){
        var word = request.params.word;
        var reply;
        if (colors[word]) {
        reply = {
            status: 'found', 
            word: word,
            score: colors[word]
        }
    } else {
        reply = {
            status: 'not found',
            word: word
        }
    }
    
response.send(reply);
}
