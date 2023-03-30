
const express = require("express");
const path = require('path');
const bodyparser = require('body-parser');
const app = express();
const port =30000;
// middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json());


// set template engine
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'app/views'));

// set folder static public
app.use(express.static('public'))

const controller = require(__dirname + "/app/controllers");
app.use(controller);

app.listen(port, () => console.log(`Listening ${port}`));
