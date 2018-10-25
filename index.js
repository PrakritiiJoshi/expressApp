//reference fs
var fs = require('fs');

//include this after we make the json file
var data = fs.readFileSync('colors.json');

//this line parses the raw data to make it readable and interprets it as a JavaScript object
var colors = JSON.parse(data);
console.log('colors');

//just ensure your script is set up correctly
console.log("server is starting");

//imports express package, which is actually a function
var express = require('express');

//making an expres app
var app = express();

//you can also create a callback function here to get information back in the terminal and verify it's working.
var server = app.listen(3000, listening);

function listening(){
    console.log("listening")
}

//route that allows user to add a word via the route parameters 

//add a question mark to score if you want score to be optional
app.get('/add/:color/:score', addColor);
function addColor(request, response){
  var data = request.params; //word and score are parameters
    var word = data.word; 
    var score = Number(data.score);
    colors[word] = score;
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
   
//route that allows the user to see all the data inside of colors.json
app.get('/all', sendAll);

////callback function to allow a user to send data and receive a response
function sendAll(request, response){
    response.send(colors);
}
  
//allows the user to query for the score of a word

app.get('/search/:word/', searchWord);

function searchWord(request, response){
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