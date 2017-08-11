const express = require('express'); // this was installed through NPM
const path = require('path'); // this comes included with Node.js
const data = require('./data');
const app = express(); // this instantiates our app and allows us to call other express methods

// middleware
const urlLogger = (request, response, next) => {
  console.log('Request URL:', request.url);
  next();
};

const timeLogger = (request, response, next) => {
  console.log('Datetime:', new Date(Date.now()).toString());
  next();
};

const divider = (request, response, next) => {
  console.log('--------------------------');
  next();
};

const notFound = (request, response, next) => {
  // console.log(response);
  if (false) {
    response.status(404).send("Sorry can't find that!")
  }
}

// the `use` method lets us run callback functions to tell the server what to do
app.use(urlLogger, timeLogger, divider);
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (request, response) => {
  response.status(200)
  // We don't need to explicitly use this handler or send a response
  // because Express is using the default path of the static assets
  // to serve this content
});

app.get('/json', (request, response) => {
  response.status(200).json(data);
});

app.get('/sunsets', (request, response) => {
  response.status(200).sendFile(__dirname + '/public/sunsets.html')
});

// the `listen` method tells express which port to listen on for data/files to be served from
// and runs a callback function that logs a message to the terminal
app.listen(3000, () => {
  console.log('Express Intro running on http://localhost:3000');
});

app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + '/public/404.html')
})
