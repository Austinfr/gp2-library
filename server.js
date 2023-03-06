const path = require('path');
const express = require('express');
require('dotenv').config();

const passport = require('passport');
require('./utils/passport');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const openLibraryApiCall = require('./utils/fetchBook');
const session = require('express-session');
const handlebars = require('express-handlebars');

const LocalStrategy = require('passport-local').Strategy;
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const handles = handlebars.create({ openLibraryApiCall });

const sessionVariable = {
    secret: 'Super not secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sessionVariable));

app.engine('handlebars', handles.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(passport.initialize());
app.use(passport.session());
app.use(routes);


app.get('/protected', 
  passport.authenticate('local', { failureRedirect: '/login' }), 
  function(req, res) {
    res.send('You have successfully authenticated!');
});

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));
});

module.exports = app;

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));
})
