//setting up express server
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
//importing routes
const apiRoutes = require('./routes/apiRoutes.js')
const htmlRoutes = require('./routes/htmlRoutes.js')
//boilerplate middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));

app.use('/api', apiRoutes)
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now running on port ${PORT}!`);
});