const express = require('express');
const app = express();
const path = require('path');
// Example route
app.use(express.static(path.join(__dirname, '/build')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './build/index.html'));
});

// // CURRENTLY THIS IS WHERE WE CAN START LISTENING FOR ONE COMMAND
// const { streamingMicRecognize } = require('./stt/listen');
// streamingMicRecognize();

app.listen(3000, function() {
    console.log('server running on port 3000!');
});
