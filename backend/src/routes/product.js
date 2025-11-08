const express = require('express');
const Product = require('../model/Product');
const router = express.Router();

//Get product
router.get('/',async(req,res)=>{
    const product=await Product.find().select('-__v');
    res.json(product);
});


//api/products/:slug
router.get('/:slug',async(req,res)=>{
    const p=await Product.findOne({ slug: req.params.slug }).select('-__v');
    if(!p) return res.status(404).json({ message: 'Product not found' });
    res.json(p);
});

module.exports = router;