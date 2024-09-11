// app.js
const express = require('express');
const path = require("path");
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;

app.use(require(path.join(__dirname, 'router/router.js')));

// In-memory storage for users
const users = [];

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Route to handle registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.send('Registration successful! <a href="/login">Login</a>')
});

// Route to handle login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = username;
    res.send('Login successful! <a href="/profile">Go to profile</a>');
  } else {
    res.send('Invalid credentials. <a href="/login">Try again</a>');
  }
});

app.get('/profile', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'public/profile.html'));
    } else {
        res.send('You are not logged in. <a href="/login">Login</a>');
    }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
