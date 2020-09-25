const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//Import Routes
const authRoute = require('./routes/auth');
const privateRoutes = require('./routes/privateRoutes');

app.use(express.json());

dotenv.config();


//Connect to Mongo
mongoose.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log('Connected to DB')
);


// Middleware

app.use('/api/user', authRoute);
app.use('/api/admin', privateRoutes);


// Handle production
if(process.env.NODE_ENV == 'production'){
  //Static folder
  app.use(express.static(__dirname + '/public/'));

  //Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on Port ${port}`));
