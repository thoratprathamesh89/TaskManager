const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist/TaskManager'));
// Start the app by listening on the default
// Heroku port
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname+'/dist/TaskManager/index.html'));
  });

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});