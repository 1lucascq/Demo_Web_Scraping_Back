const express = require("express");
const routes = require('./routes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());
app.use('/', routes);

app.listen(PORT, () => console.log(`On: ${PORT}`));

module.exports = app;