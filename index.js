const express = require('express');
const routes = require('./src/routes');
const { initializeDatabase } = require('./src/config/initDB');
const { initializeHandlebars } = require('./src/config/initHandlebars');
const { auth } = require('./src/middlewares/authMiddleware');
const cookieParser = require('cookie-parser');

const app = express();

initializeDatabase(app);
initializeHandlebars(app)
app.use('/public', express.static('public'));
app.use(cookieParser())
app.use(auth)
app.use(express.urlencoded({ extended: false }));
app.use(routes)
