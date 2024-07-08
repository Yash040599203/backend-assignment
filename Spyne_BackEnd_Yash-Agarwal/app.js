const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const userRoutes = require('./routes/userRoutes');
const discussionRoutes = require('./routes/discussionRoutes');

const app = express();

// Middleware
app.use(express.json());

// Database Connection
mongoose.connect(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/users', userRoutes);
app.use('/discussions', discussionRoutes);

const PORT = config.app.port;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
