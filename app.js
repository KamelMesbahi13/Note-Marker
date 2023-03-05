const express = require('express');
const mongoose = require('mongoose');
const tasks = require('./routes/noteRoute');
const dotenv = require('dotenv');
const app = express();

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3000;

// MIDDLEWARE
app.use(express.static('./public'));
app.use(express.json());

// Routes
app.use('/api/v1/tasks', tasks);

mongoose.set('strictQuery', true);

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`App Running On Port ${port}`);
    });
    console.log('db connected');
  });
