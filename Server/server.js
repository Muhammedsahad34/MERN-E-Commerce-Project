const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const ProductModel = require('./Models/ProductSchema');
const multer = require('multer');
const bodyParser = require('body-parser');
const UserModel = require('./Models/UserSchema');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cookieParser = require('cookie-parser');


const app = express();
const PORT = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET"],
  credentials:true
}
));
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({name:"my-session-cookie", secret:"Key",cookie:{maxAge:1000 * 60 * 60 * 24},resave: false,
saveUninitialized: false,}))

mongoose.connect('mongodb://localhost:27017/shoppingCart', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/product-images'); // Set the destination folder for uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`); // Use the original filename for the uploaded image
  },
});
const upload = multer({ storage });

app.post('/addProduct', upload.single('image'), (req, res) => {
  const { name, category, price, description } = req.body;
  const image = req.file ? `${req.file.originalname}` : '';
  const product = { name, category, price, description, image }
  const newProduct = new ProductModel(product);

  newProduct.save().then((savedproduct) => {
    //  console.log(savedproduct);
    res.json(savedproduct);
  }).catch((error) => {
    // console.log(error);
    res.json(error);
  })
})

app.get('/getProduct', (req, res) => {
  ProductModel.find({}).then((response) => {
    res.json(response)
  }).catch((err) => {
    res.json(err)
  })
})

app.post('/signup', async (req, res) => {

  let user = req.body;
  user.password = await bcrypt.hash(user.password, 10);
  
  try {
    const existingUser = await UserModel.find({ email: user.email });
    if(existingUser.length > 0){
       res.json('false')
    }else{
      const newUser = new UserModel(user);
      newUser.save();
       res.json('true')
    }

  } catch (error) {
    res.json(error);
  }
})


app.post('/login',async (req,res)=>{

  let {email,password} = req.body;
  try{
    const user = await UserModel.find({email});
    if(user.length > 0){
      const ispass = await bcrypt.compare(password,user[0].password);
      
      if(ispass === true){
        req.session.loggedIn = true;
        req.session.user = user[0];
        // console.log(req.session.user);
        res.json({status:'true'})
      }else{
        res.json('false')
      }
    }else{
      res.json('false');
    }

  }catch(error){
    res.json(error)
  }
  
})

app.get('/getprofile',(req, res)=>{
  if(req.session.user){
    return res.json({valid:true, user:req.session.user})
  }else{
    return res.json({valid:false})
  }
})

app.get('/logout', (req,res)=>{
  req.session.destroy((err)=>{
    if(err){
      res.json({status: 'error'})
    }else{
      res.clearCookie('my-session-cookie')
      res.json({status: 'success'})
    }
  })
})

app.get('/productDelete/:id', async(req,res)=>{
  const proId = req.params.id;
  await ProductModel.findByIdAndDelete(proId).then((response)=>{
    res.json(response);
  }).catch((err)=>{
    res.json(err)
  }) 
})

app.get('/oneProduct/:id', async(req,res)=>{
  const proId = req.params.id;
  await ProductModel.findById(proId).then((response)=>{
    res.json(response);
  }).catch((err)=>{
    res.json(err);
  })
})

app.post('/updateProduct/:id',upload.single('image'), async(req,res)=>{
  const proId = req.params.id;
  const { name, category, price, description,oldimage } = req.body;
  const image = req.file ? `${req.file.originalname}` : oldimage;
  const product = { name, category, price, description, image };
  await ProductModel.findByIdAndUpdate(proId,product, {new:true}).then((response)=>{
    res.json(response)
  }).catch((err)=>{
    res.json(err)
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});