'use strict';

import express from 'express';
import employeeRouter from './routes/employee';
const app = express();
const port = parseInt(process.env.PORT || '3000');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/employees', employeeRouter);

// Fail over route
app.use(function(req, res) {
    res.status(404).send('Not found');
});

// listen for requests
app.listen(port, function() {
    console.log(`Server is listening on port ${port}`);
});


module.exports = app;
