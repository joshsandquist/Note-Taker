const express = require('express');
const path = require('path')
const app = express();
const PORT = process.env.PORT || 3001;
const apiRoutes = require('./routes/apiRoutes')
const htmlRoutes = require('./routes/htmlRoutes')

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));

app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now running on port ${PORT}!`);
});