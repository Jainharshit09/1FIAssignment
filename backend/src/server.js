const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();


const productRoutes = require('./routes/product');

const app=express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('Mongo error:', err));

const PORT=process.env.PORT||4000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
    