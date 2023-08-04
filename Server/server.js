const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const ProductModel = require('./Models/ProductSchema');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/shoppingCart', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/product-images'); // Set the destination folder for uploaded images
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Use the original filename for the uploaded image
    },
  });
  const upload = multer({ storage });

app.post('/addProduct',upload.single('image'), (req,res)=>{
    const {name, category, price, description} = req.body;
    const image = req.file ? `product_image_${req.file.originalname}` : '';
    const product = {name, category, price, description,image}
    const newProduct = new ProductModel(product);
    newProduct.save().then((savedproduct)=>{
         console.log(savedproduct);
         res.json(savedproduct);
     }).catch((error)=>{
        console.log(error);
        res.json(error);
    })
})

app.use('/images', express.static('public/images'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});