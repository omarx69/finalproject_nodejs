const express = require("express");
const jwt = require('jsonwebtoken');
const cors = require('cors');
const connectDB=require('./config/db');

const {getAllProducts, addProduct, deleteProduct}=require('./controllers/itemControllers');

const {getAllUsers, deleteUser, signup, signin}=require('./controllers/userController');

const authenticate = require('./middlewares/Authenticate');
const isAdmin = require('./middlewares/isAdmin');

const app = express()

// Use  middleware
app.use(express.json())
app.use(cors());

//connection with database	
connectDB()

//user Routes
app.get("/users", authenticate, isAdmin, getAllUsers);

app.delete("/user/:userId", authenticate, isAdmin, deleteUser);

app.post("/signup", signup);

app.post("/signin/", signin);

// ======= products ENDPOINTS =====

//add new product
app.post("/product", authenticate,isAdmin, addProduct);

//get all products
app.get("/products", getAllProducts);


//delete a product 
app.delete("/product/:productId", authenticate,isAdmin, deleteProduct);


app.listen(3003, () => {
	console.log("I am listening in port 3003");
});





