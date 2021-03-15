const express = require('express');
const cors = require('cors');
const {json} = require('body-parser');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(json());

const port = 3133;



app.listen(port, () => console.log(`Listening on port ${port}`))