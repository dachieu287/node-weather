const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;


const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Hieu'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Hieu'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Ngoeo',
    helpText: 'This is some helpful text'
  });
});

app.get('/help/*', (req, res) => {
  res.send('Help artice not found');
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a address term!'
    });
  }

  forecast(req.query.address, (error, data) => {
    console.log(error);
    if (error) {
      return res.send({
        error
      });
    }

    res.send({
      data
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }

  res.send({
    products: []
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ngoeo',
    errorMessage: 'Page not found'
  });
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});