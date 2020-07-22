const express = require('express')
const bodyParser = require('body-parser')
const api = require('./server/routes/api')
const mongoose = require('mongoose');
const path = require('path');
const handlebars = require('handlebars');
const app = express()
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));

mongoose.connect('mongodb://localhost/Weather-App-FullStack-Project', {
  useNewUrlParser: true,
});


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/', api)






const port = 3000
app.listen(port, function () {
    console.log(`Server running on ${port}`)
})