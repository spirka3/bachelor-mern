const mongoose = require('mongoose');

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => { console.log('Connected to MongoDB') })
  .catch((err) => { console.log('Err connecting to MongoDB:', err.message) })

module.exports = mongoose
