const express = require('express');
require('./db/mongoose');
const emp_router = require('./routers/emp');
const admin_router = require('./routers/admin_login');
// const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(emp_router);
app.use(admin_router);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
