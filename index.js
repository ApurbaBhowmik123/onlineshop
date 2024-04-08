const express = require('express');
const cors = require('cors');
const dataase = require('./db/config');
const User = require("./db/User");
const cart = require("./db/cart");
const Shopsadd = require("./db/Shopsadd")
const Products = require("./db/Products")
const multer = require('multer')
const app = express();
const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload')
app.use(express.json());
const Shop = require("./db/Shop");
// const localStorage=require('localStorage')
// const adminData = JSON.parse(localStorage.getItem('admin'));

// const path = require('path');
// app.use(express.static('images'));
app.use(fileUpload())
dataase ()
cloudinary.config({
    cloud_name: 'deftpdfga',
    api_key: '675153757725399',
    api_secret: '3hzrtQXgbAA9g5sn712VefDEU_c'
});
// const images=require("../backend/image")

const allowedaorgins = ['http://localhost:3001']
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedaorgins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('not allow by cors policy'))
        }
    },
    methods: "GET, HEAD, PUT,PATCH, POST, DELETE",
    Credentials: true
}
app.use(cors(corsOptions));



app.post("/signup", async (req, res) => {
    let user = new User(req.body)
    let result = await user.save();
    res.send(result);
})
app.post("/login", async (req, res) => {
    console.log(req.body)
    if (req.body.password && req.body.email) {
        //const email = req.body.email
        // let user = new User(req.body)
        let result = await User.findOne(req.body)
        console.log(result);
        if (result) {
            res.send(result);
        } else {
            res.send({ result: 'No User Found' });
        }
    } else {
        res.send({ result: 'Please try again latter' })
    }
})

app.post("/adminlogin", async (req, res) => {
    console.log(req.body)
    if (req.body.password && req.body.Name) {

        let result = await Shopsadd.findOne(req.body)
        console.log(result);
        if (result) {
            res.send(result);
        } else {
            res.send({ result: 'No Shop Found' });
        }
    } else {
        res.send({ result: 'Please try again latter' })
    }
})
app.post("/createshops", async (req, res) => {
    const { Name, location, city, password } = req.body;
    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: 'image'
    })
    if (!Name || Name.trim() === '') {
        return res.status(400).json({ message: "Name is required", success: false });
    }
    console.log(req.body)
    const newImage = new Shopsadd({
        Name,
        location,
        city,
        password,
        image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    });
    console.log(newImage)
    await newImage.save();
    // res.send(newImage);
    //  res.status(201).json({ message: "upload success", success: true });
    res.status(201).json({
        message: "Shop created successfully",
        success: true,
        shopData: {
            _id: newImage._id,
            Name: newImage.Name,
            location: newImage.location,
            city: newImage.city,
            image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }

        }
    });
});


app.post("/createproducts", async (req, res) => {
    try {
        const { name, id, image, category, title, strikeprice, price, star, review, color, size, stock } = req.body;
        const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
            folder: 'image'
        });

        if (!name || name.trim() === '') {
            return res.status(400).json({ message: "name is required", success: false });
        }

        console.log(req.body);

        const newProduct = new Products({
            name,
            id, // Make sure 'id' is defined or replace it with a valid value
            category,
            title,
            strikeprice,
            price,
            star,
            review,
            color,
            size,
            stock,
            image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        });

        console.log(newProduct);

        await newProduct.save();
        res.status(201).json({ message: "upload success", success: true });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
});

app.get('/shops', async (req, res) => {
    try {
        const shopId = req.params.id;
        const shops = await Shopsadd.find();
        // res.send(shops);
        res.status(200).json({ message: "success", success: true, shops });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//admin productlist

app.get('/adminproductlist/:adminId', async (req, res) => {
    try {
        const adminId = req.params.adminId;
        console.log('Received adminId:', adminId);

        const shops = await Products.find({ id: adminId });

        if (!shops || shops.length === 0) {
            return res.status(404).json({ message: "No products found", success: false });
        }
        console.log('Products found:', shops);

        res.status(200).json({ message: "success", success: true, shops });
        console.log(shops)

    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//admin productlist delete
app.delete('/admin/deleteproduct/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        await Products.findByIdAndDelete(productId);
        res.status(200).json({ message: 'Product deleted successfully', success: true });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//admin shop delete
app.delete('/admin/deleteshop/:shopId', async (req, res) => {
    try {
        const shopId = req.params.shopId;

        // Delete associated products
        // await Products.deleteMany({ id: shopId });

        // Delete the shop
        await Shopsadd.findByIdAndDelete(shopId);

        res.status(200).json({ message: 'Shop deleted successfully', success: true });
    } catch (error) {
        console.error('Error deleting shop:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.get('/viewproducts/:id', async (req, res) => {
    try {
        const shopId = req.params.id;
        const shops = await Products.find({ id: shopId });
        console.log(shops)

        if (!shops) {
            return res.status(404).json({ message: "Product not found", success: false });
        }

        res.status(200).json({ message: "success", success: true, shops });

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

})
app.get('/singleproducts/:id', async (req, res) => {
    try {
        const singleId = req.params.id;
        const shops = await Products.findById(singleId);
        if (!shops) {
            return res.status(404).json({ message: "Product not found", success: false });
        }

        res.status(200).json({ message: "success", success: true, shops });

        // const shops = await Products.find()
        console.log(shops)

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });

    }
})

// Update the /suggestshops/:shopId route in your Express app

app.get('/suggestshops/:shopId', async (req, res) => {
    try {
        const currentShopId = req.params.shopId;

        // Fetch all shops excluding the current shop
        const suggestedShops = await Shopsadd.find({ _id: { $ne: currentShopId } });

        if (!suggestedShops || suggestedShops.length === 0) {
            return res.status(404).json({ message: 'No suggested shops found', success: false });
        }

        res.status(200).json({ message: 'Success', success: true, suggestions: suggestedShops });
    } catch (error) {
        console.error('Error fetching suggested shops:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Define the cart schema


  app.get('/api/cart/:_id', async (req, res) => {
    try {
      const { _id } = req.params;
  
      // Find the user by ID in the database
      const user = await User.findById(_id);
  
      if (user) {
        res.json({ items: user.cart });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.listen(5000, () => {
    console.log('app is running on port 5000')
});
