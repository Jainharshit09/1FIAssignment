const mongoose = require('mongoose');
const Product = require('../model/Product');
const data = require('./products.seed.json');
require('dotenv').config();

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany({});
  await Product.insertMany(data);
  console.log('Seeded products');
  process.exit(0);
})();
