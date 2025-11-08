const mongoose=require('mongoose');

const EmiPlanSchema=new mongoose.Schema({
    name:String,
    tenureMonths:Number,
    annualInterestRate:Number,
     cashback: {
    enabled: Boolean,
    amount: Number 
  },
  notes:String,
},{_id:false});

const VariantSchema=new mongoose.Schema({
    sku:String,
    slug:String,
    attributes: mongoose.Schema.Types.Mixed,
    image:String,
    mrp: Number,
    price: Number
},{_id:false});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: String,
  slug: { type: String, required: true, unique: true },
  description: String,
  variants: [VariantSchema],
  emiPlans: [EmiPlanSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports=mongoose.model('Product',ProductSchema);