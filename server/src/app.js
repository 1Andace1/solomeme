require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const apiRouter = require('./routers/api.router');

const app = express();
const { PORT } = process.env;

if (!PORT) {
  console.error('PORT is not defined in the environment variables');
  process.exit(1);
}

const corsConfig = {
  origin: ['http://localhost:5173'],
  credentials: true,
};

const upload = multer({ dest: 'uploads/' });

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsConfig));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', apiRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
