const express = require("express");
const validator = require("validator");
const authRoutes = require('./routes/authRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const activityRoutes = require('./routes/activityRoutes');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require('cors');

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//database connection
const dbURI = 'mongodb://127.0.0.1:27017/resup';
mongoose.connect(dbURI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
 })
 .then(() => console.log('database connected successfully'))
.catch((err) => console.log(err));

app.use(authRoutes);
app.use(resourceRoutes);
app.use(activityRoutes);

app.listen(8000, ()=>{
    console.log('server is running...');
});

