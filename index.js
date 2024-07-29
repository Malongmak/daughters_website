// index.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Dummy user data
const users = {
  'admin': 'password123'
};

// Routes
app.get('/', (req, res) => {
  if (req.session.user) {
    res.send(`<h1>Welcome, ${req.session.user}!</h1><a href="/logout">Logout</a>`);
  } else {
    res.sendFile(__dirname + '/login.html');
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username] === password) {
    req.session.user = username;
    res.redirect('/');
  } else {
    res.send('Invalid credentials');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
