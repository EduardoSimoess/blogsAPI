const express = require('express');

// ...

const app = express();

const loginRouter = require('./routes/login.route');
const userRouter = require('./routes/user.route');

app.use(express.json());
app.use('/login', loginRouter);
app.use('/user', userRouter);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
