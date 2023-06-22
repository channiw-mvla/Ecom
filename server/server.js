const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors()) 
app.use(express.json());   
app.use(express.urlencoded({ extended: true }));

const port = 8000;
    
require('./config/mongoose.config');

const productRoutes = require("./routes/product.routes");
productRoutes(app);

app.listen(port, () => console.log(`Listening on port: ${port}`) );
