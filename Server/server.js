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
      cb(null, 'public/images'); // Set the destination folder for uploaded images
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Use the original filename for the uploaded image
    },
  });
  const upload = multer({ storage });

app.post('/addProduct', (req,res)=>{
    //const {name, category, price, description} = req.body;
    // const imageUrl = req.file ? `images/${req.file.originalname}` : '';
    // const data = JSON.parse(req.body.data)
    console.log(req.body)
    // const product = {name, category, price, description}
    // const newProduct = new ProductModel(product);
    // newProduct.save().then((savedproduct)=>{
    //     console.log(savedproduct);
    // }).catch((error)=>{
    //     console.log(error);
    // })
})

app.use('/images', express.static('public/images'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});