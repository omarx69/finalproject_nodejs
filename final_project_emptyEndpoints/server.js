const express = require("express");
const jwt = require('jsonwebtoken');
const cors = require('cors');
const connectDB=require('./config/db');

const {getAllProducts, addProduct, deleteProduct}=require('./controllers/itemControllers');

const {getAllUsers, deleteUser, signup, signin}=require('./controllers/userController');

const authenticate = require('./middleware/authenticate');
const isAdmin = require('./middlewares/isAdmin');

const app = express()

// Use  middleware
app.use(express.json())
app.use(cors());

//connection with database	
connectDB()

//user Routes
app.get("/users", getAllUsers);

app.delete("/user/:userId", isAdmin,deleteUser);

app.post("/signup", authenticate, signup);

app.post("/signin/", signin);

// ======= products ENDPOINTS =====

//add new product
app.post("/product", isAdmin, addProduct);

//get all products
app.get("/products", getAllProducts);


//delete a product 
app.delete("/product/:productId", isAdmin, deleteProduct);


app.listen(3003, () => {
	console.log("I am listening in port 3003");
});





