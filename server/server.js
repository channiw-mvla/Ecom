const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = 8000;
require('dotenv').config();

require('./config/mongoose.config');
require('./routes/user.route')(app);
require('./routes/product.routes')(app);



app.listen(port, () => console.log(`Listening on port: ${port}`) );





