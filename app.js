const express = require("express");
const app = express();
const { connectMongoose } = require("./database");
const bodyParser = require("body-parser");
const cors = require('cors')
const compression = require("compression")

app.use(compression())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
const fileUploadRoute = require('./routes/upload-file')
const emailRoute = require('./routes/email')
const graphQLRoute = require('./routes/graphql')

app.use(fileUploadRoute)
app.use(emailRoute)
app.use(graphQLRoute)

connectMongoose(() => {
  const server = app.listen(process.env.PORT || 1337, () => {
    console.log(`Listening on port ${process.env.PORT || 1337}...`);
  });
});
