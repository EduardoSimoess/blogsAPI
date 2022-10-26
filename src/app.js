const express = require('express');

// ...

const app = express();

const loginRouter = require('./routes/login.route');

app.use(express.json());
app.use('/login', loginRouter);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
