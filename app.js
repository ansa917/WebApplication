const express = require('express');
const exphbs = require('express-handlebars');
const accessTokenMiddleware = require('./middleware/accessTokenMiddleware');

const app = express();

const loginRouter = require('./routes/login');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const venuesRouter = require('./routes/venues');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/login', loginRouter);
app.use('/', accessTokenMiddleware, indexRouter);
app.use('/users', accessTokenMiddleware, usersRouter);
app.use('/venues', accessTokenMiddleware, venuesRouter);

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'handlebars',
    helpers: require('./config/hbs')
});
app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

app.listen(3000, () => {
    console.log('Server is running at: http://localhost:3000');
});
