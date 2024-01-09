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
const CartModel = require('./Models/CartSchema');
const OrderModel = require('./Models/OrderSchema');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const AdminModel = require('./Models/AdminSchema');
var instance = new Razorpay({
  key_id: 'rzp_test_TNgeRWAxCwvh66',
  key_secret: 'DcbcNNS0AJWuGrzwGVKsXjKD',
});


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
const verifyAdmin = (req,res,next)=>{
  if(req.session.admin){
    next()
  }
}


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
      newUser.save().then((response)=>{
        req.session.user = response;
        res.json('true')
      })
      
       
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
  req.session.user = null;
  if(req.session.user !== null){
    res.json(false)
  }else{
    res.json(true)
  }
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

app.get('/addToCart/:id', async(req,res)=>{
  const proId = req.params.id;
  const userId = req.session.user._id;
  try{
    let userCart = await CartModel.findOne({user:userId});
    if(userCart){
      const existingProduct = userCart.products.findIndex(product=>product.item.toString()==proId);
      if(existingProduct !== -1){
        userCart.products[existingProduct].count += 1;
      }else{
        userCart.products.push({item:proId,count:1})
      }
      await userCart.save().then((response)=>{
        res.json(response)
      }).catch(err=>console.log(err));
    }else{
      userCart = new CartModel({user:userId,products:[{item:proId,count:1}]});
      await userCart.save().then((response)=>{
        res.json(response);
      }).catch((err)=>{
        res.json(err);
      })
     
    }

  }catch(err){
    console.log(err)
  }
});

app.get('/fetchCart',async(req,res)=>{
  userId = req.session.user._id;
  const productsInCart = await CartModel.aggregate([
    {
      $match:{user:userId}
    },
    {
      $unwind:'$products'
    },
    {
      $lookup:{
        from: 'products',
        localField:'products.item',
        foreignField:'_id',
        as:'productDetails'
      }
    },
    {
      $unwind:'$productDetails'
    },
    {
      $project:{
        _id:'$productDetails._id',
        name:'$productDetails.name',
        category: '$productDetails.category',
        price: '$productDetails.price',
        image:'$productDetails.image',
        count: '$products.count'

      }
    }
  ])
  let totalPrice = 0;
    productsInCart.forEach(element => {
      totalPrice = totalPrice + element.count * element.price
  });
  if(productsInCart.length === 0){
    res.json({data:false,total:0})
  }else{
    res.json({data:productsInCart,total:totalPrice});
  }
  
  
});

app.get('/incDecCart/:id/:count',async (req,res)=>{
  proId = req.params.id;
  userId = req.session.user._id;
  incDec = parseInt(req.params.count);
  const userCart = await CartModel.findOne({user:userId});
  if(userCart){
    const productIndex = userCart.products.findIndex(product=>product.item.toString()=== proId);
    if(productIndex !== -1){
      userCart.products[productIndex].count += incDec;
      await userCart.save().then((response)=>{
        res.json(response.products[productIndex]);
      })
    }
  }
  
})

app.get('/removeFromCart/:id',async(req,res)=>{
  proId = req.params.id;
  userId = req.session.user._id;
  cart = await CartModel.findOneAndUpdate({user:userId,'products.item':proId},
  {$pull:{products:{item:proId}}},
  {new:true}
  ).then((respnse)=>{
  
     res.json(respnse);
  })
})

app.post('/placeOrder',async(req,res)=>{
  const {adress,pincode,number,total,paymentMethod} = req.body;
  const status = paymentMethod === 'COD' ? 'Placed':'Pending';
  const userId = req.session.user._id;
  const cart = await CartModel.findOne({user:userId});
  const products = cart.products;
  const order = {
    user:userId,
    deliveryDetails:{
      adress,
      pincode,
      number
    },
    products,
    total,
    paymentMethod,
    status,
    date: new Date(),
  }
  newOrder = new OrderModel(order);
  newOrder.save().then(async(response)=>{
    if(response.status === 'Placed'){
      
      res.json({data:response,placed:true})
    }else{
      instance.orders.create({
        amount: total * 100,
        currency: "INR",
        receipt: response._id,
      },function (err,order){
        res.json(order)
      })
    }
    await CartModel.findOneAndRemove({user:userId})
  }).catch((err)=>console.log(err));

});

app.get('/fetchOrderDetails',async(req,res)=>{
  userId = req.session.user._id;
  const orderDetails = await OrderModel.find({user:userId});
  res.json( orderDetails);
});

app.post('/savePayment',async(req,res)=>{
  const details = req.body;
  let hmac = crypto.createHmac('sha256','DcbcNNS0AJWuGrzwGVKsXjKD');
  hmac.update(details.paymentDetails.razorpay_order_id + '|' + details.paymentDetails.razorpay_payment_id);
  hmac = hmac.digest('hex');
  if(hmac == details.paymentDetails.razorpay_signature){
    await OrderModel.findByIdAndUpdate(details.orderDetails.receipt,{status:'Placed'},{new:true}).then((response)=>{
      res.json({status:true})
    }).catch((err)=>{
      res.json({status:false})
    })
  }else{
    res.json({status:false});
  }
});

app.get('/fetchEachOrder/:id',async(req,res)=>{
  const orderId = req.params.id;
  const orderDetails = await OrderModel.aggregate([
    
      {
        $match: { _id: new mongoose.Types.ObjectId(orderId)}
      },
      {
        $unwind:"$products"
      },
      {
        $lookup:{
          from:"products",
          localField:"products.item",
          foreignField:"_id",
          as:"productDetails"
        }
      },
      {
        $unwind:"$productDetails"
      },
      {
        $project: {
          _id: 1,
          user: 1,
          deliveryDetails: 1,
          total: 1,
          paymentMethod: 1,
          status: 1,
          date: 1,
          __v: 1,
          productDetails: 1
        }
      },
      {
        $group: {
          _id: {
            _id: "$_id",
            user: "$user",
            deliveryDetails: "$deliveryDetails",
            total: "$total",
            paymentMethod: "$paymentMethod",
            status: "$status",
            date: "$date",
            __v: "$__v",
          },
          productDetails: { $push: "$productDetails" }
        }
      },
      {
        $project: {
          _id: "$_id._id",
          user: "$_id.user",
          deliveryDetails: "$_id.deliveryDetails",
          total: "$_id.total",
          paymentMethod: "$_id.paymentMethod",
          status: "$_id.status",
          date: "$_id.date",
          __v: "$_id.__v",
          productDetails: 1
        }
      }
      
      
    ]);
  
  
  res.json(orderDetails);
});


app.post('/admin/login',async(req,res) => {
  let {email,password} = req.body;
  const username = email;
  try{
    
    const admin = await AdminModel.find({username});
    if(admin.length > 0){
      const ispass = await bcrypt.compare(password,admin[0].password);
      
      if(ispass === true){
        req.session.admin = admin[0];

        res.json({status:true,admin:req.session.admin})
      }else{
        res.json(false)
      }
    }else{
      res.json(false);
    }

  }catch(error){
    res.json(error)
  }
  
})
app.get('/admin/getAdmin',verifyAdmin, (req,res)=>{
  if(req.session.admin){
    res.json({status:true,data:req.session.admin})
  }else{
    res.json(false)
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});